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
     * Display a listing of the user's actions.
     */
    public function index(): Response
    {
        $actions = Action::query()
            ->where('user_id', auth()->id())
            ->with(['store', 'verification'])
            ->latest()
            ->paginate(15)
            ->through(fn ($action) => [
                'id' => $action->id,
                'packages_flipped' => $action->packages_flipped,
                'notes' => $action->notes,
                'created_at' => $action->created_at,
                'verification_status' => $action->verification_status,
                'store' => $action->store,
            ]);

        return Inertia::render('actions/index', [
            'actions' => $actions,
        ]);
    }

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

        return to_route('actions.index')->with('success', 'Action reported successfully!');
    }
}
