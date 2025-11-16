<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActionRequest;
use App\Models\Action;
use App\Models\Store;
use Illuminate\Http\RedirectResponse;
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
            ->latest('performed_at')
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
        $stores = Store::query()
            ->orderBy('address')
            ->get(['id', 'name', 'address', 'city', 'country']);

        return Inertia::render('actions/create', [
            'stores' => $stores,
        ]);
    }

    /**
     * Store a newly created action in storage.
     */
    public function store(StoreActionRequest $request): RedirectResponse
    {
        Action::create([
            'user_id' => $request->user()->id,
            'store_id' => $request->input('store_id'),
            'packages_flipped' => $request->input('packages_flipped'),
            'notes' => $request->input('notes'),
            'photos' => $request->input('photos', []),
            'performed_at' => $request->input('performed_at'),
        ]);

        return to_route('actions.index')->with('success', 'Action reported successfully!');
    }
}
