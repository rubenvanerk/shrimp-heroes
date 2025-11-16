<?php

namespace App\Jobs;

use App\Models\Action;
use App\Models\ActionVerification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Schema\BooleanSchema;
use Prism\Prism\Schema\NumberSchema;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;
use Prism\Prism\ValueObjects\Media\Image;

class VerifyActionJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public Action $action) {}

    public function handle(): void
    {
        try {
            $exifData = $this->extractExifData();
            $aiResponse = $this->analyzeWithAi($exifData);

            ActionVerification::create([
                'action_id' => $this->action->id,
                'ai_detected_packages' => $aiResponse['detected_packages'],
                'ai_confidence_score' => $aiResponse['confidence_score'],
                'location_verified' => $aiResponse['location_verified'],
                'timestamp_verified' => $aiResponse['timestamp_verified'],
                'exif_data' => $exifData,
                'ai_analysis' => $aiResponse['analysis'],
                'processed_at' => now(),
            ]);

            Log::info('Action verification completed', [
                'action_id' => $this->action->id,
                'confidence_score' => $aiResponse['confidence_score'],
            ]);
        } catch (\Exception $e) {
            Log::error('Action verification failed', [
                'action_id' => $this->action->id,
                'error' => $e->getMessage(),
            ]);

            ActionVerification::create([
                'action_id' => $this->action->id,
                'error_message' => $e->getMessage(),
                'processed_at' => now(),
            ]);
        }
    }

    protected function extractExifData(): array
    {
        if (! $this->action->photos || count($this->action->photos) === 0) {
            return [];
        }

        $allExifData = [];

        foreach ($this->action->photos as $index => $photoUrl) {
            try {
                $photoPath = $this->downloadPhotoTemporarily($photoUrl);

                if (! $photoPath || ! file_exists($photoPath)) {
                    continue;
                }

                $exif = @exif_read_data($photoPath);

                if ($exif) {
                    $allExifData["photo_{$index}"] = $exif;
                }

                @unlink($photoPath);
            } catch (\Exception $e) {
                Log::warning("Failed to extract EXIF from photo {$index}", [
                    'action_id' => $this->action->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return $allExifData;
    }

    protected function downloadPhotoTemporarily(string $url): ?string
    {
        try {
            $tempPath = sys_get_temp_dir().'/'.uniqid('photo_', true).'.jpg';
            $response = Http::get($url);

            if ($response->successful()) {
                file_put_contents($tempPath, $response->body());

                return $tempPath;
            }
        } catch (\Exception $e) {
            Log::warning('Failed to download photo temporarily', [
                'url' => $url,
                'error' => $e->getMessage(),
            ]);
        }

        return null;
    }

    protected function analyzeWithAi(array $exifData): array
    {
        $images = [];
        foreach ($this->action->photos ?? [] as $photoUrl) {
            $images[] = Image::fromUrl(url: $photoUrl);
        }

        $store = $this->action->store;
        $storeLocation = $store
            ? "Store: {$store->name}, Location: ({$store->latitude}, {$store->longitude})"
            : 'Store: Unknown';
        $exifSummary = empty($exifData)
            ? 'No EXIF data available'
            : json_encode($exifData, JSON_PRETTY_PRINT);

        $prompt = view('prompts.verify-action', [
            'action' => $this->action,
            'storeLocation' => $storeLocation,
            'exifSummary' => $exifSummary,
        ])->render();

        $schema = new ObjectSchema(
            name: 'action_verification',
            description: 'Verification results for a shrimp package flipping action',
            properties: [
                new NumberSchema('detected_packages', 'Number of flipped shrimp packages visible in the photo(s)'),
                new NumberSchema('confidence_score', 'Confidence score from 0-100 for the action legitimacy'),
                new BooleanSchema('location_verified', 'Whether EXIF GPS coordinates match the store location'),
                new BooleanSchema('timestamp_verified', 'Whether EXIF timestamp is reasonable compared to submission time'),
                new StringSchema('analysis', 'Detailed explanation of findings, anomalies, and reasoning'),
            ],
            requiredFields: ['detected_packages', 'confidence_score', 'location_verified', 'timestamp_verified', 'analysis']
        );

        $model = config('prism.providers.openrouter.model', 'anthropic/claude-sonnet-4.5');

        $response = Prism::structured()
            ->using(Provider::OpenRouter, $model)
            ->withSchema($schema)
            ->withPrompt($prompt, $images)
            ->asStructured();

        return $response->structured;
    }
}
