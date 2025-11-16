<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActionRequest;
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
            ->with('store')
            ->latest()
            ->paginate(15);

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

        // Handle photo uploads
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                // Store in storage/app/public/actions directory
                $path = $photo->store('actions', 'public');
                $photoPaths[] = $path;
            }
        }

        Action::create([
            'user_id' => $request->user()->id,
            'store_id' => $request->input('store_id'),
            'packages_flipped' => $request->input('packages_flipped'),
            'notes' => $request->input('notes'),
            'photos' => $photoPaths,
        ]);

        return to_route('actions.index')->with('success', 'Action reported successfully!');
    }
}
