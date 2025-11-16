<?php

namespace App\Console\Commands;

use App\Models\Store;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

use function Laravel\Prompts\progress;

class ImportStoresCommand extends Command
{
    protected $signature = 'stores:import {file=resources/data/stores.csv}';

    protected $description = 'Import stores from CSV file';

    public function handle(): int
    {
        $filePath = base_path($this->argument('file'));

        if (! File::exists($filePath)) {
            $this->error("File not found: {$filePath}");

            return self::FAILURE;
        }

        $this->info("Importing stores from {$filePath}...");

        $handle = fopen($filePath, 'r');
        $header = fgetcsv($handle);

        $rows = [];
        while (($row = fgetcsv($handle)) !== false) {
            $rows[] = array_combine($header, $row);
        }
        fclose($handle);

        $imported = 0;
        $updated = 0;
        $skipped = 0;

        progress(
            label: 'Importing stores',
            steps: $rows,
            callback: function ($row) use (&$imported, &$updated, &$skipped) {
                if (empty($row['place_id'])) {
                    $skipped++;

                    return;
                }

                $store = Store::updateOrCreate(
                    ['place_id' => $row['place_id']],
                    [
                        'name' => $row['name'] ?? null,
                        'address' => $row['address'] ?? null,
                        'city' => $row['city'] ?? null,
                        'country' => $row['country'] ?? null,
                        'latitude' => $row['lat'] ?? null,
                        'longitude' => $row['lon'] ?? null,
                    ]
                );

                if ($store->wasRecentlyCreated) {
                    $imported++;
                } else {
                    $updated++;
                }
            }
        );

        $this->comment("Imported {$imported} new stores.");
        $this->comment("Updated {$updated} existing stores.");

        if ($skipped > 0) {
            $this->comment("Skipped {$skipped} rows without place_id.");
        }

        return self::SUCCESS;
    }
}
