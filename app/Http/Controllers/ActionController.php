<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActionRequest;
use App\Jobs\VerifyActionJob;
use App\Models\Action;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActionController extends Controller
{
    /**
     * Show the form for creating a new action.
     */
    public function create(): Response
    {
        return Inertia::render('actions/create');
    }

    /**
     * Store a newly created action in storage.
     */
    public function store(StoreActionRequest $request): RedirectResponse
    {
        $photoPaths = [];
        $photoUrls = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('actions', 'public');
                $photoPaths[] = $path;
                $url = Storage::disk('public')->url($path);
                $photoUrls[] = preg_replace('#(?<!:)//+#', '/', $url);
            }
        }

        $action = Action::create([
            'user_id' => $request->user()->id,
            'store_id' => $request->input('store_id'),
            'packages_flipped' => $request->input('packages_flipped'),
            'notes' => $request->input('notes'),
            'photos' => $photoUrls,
        ]);

        VerifyActionJob::dispatch($action);

        return to_route('actions.success', ['packages_flipped' => $action->packages_flipped]);
    }

    /**
     * Show the success page after creating an action.
     */
    public function success(): Response
    {
        $userId = auth()->id();

        $totalPackagesFlipped = (int) Action::where('user_id', $userId)->sum('packages_flipped');
        $totalActions = (int) Action::where('user_id', $userId)->count();

        return Inertia::render('actions/success', [
            'packagesFlipped' => (int) request('packages_flipped'),
            'totalPackagesFlipped' => $totalPackagesFlipped,
            'totalActions' => $totalActions,
            'shrimpPerPackage' => config('shrimp-heroes.shrimp_per_package'),
        ]);
    }
}
