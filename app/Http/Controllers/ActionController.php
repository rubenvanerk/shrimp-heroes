<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActionRequest;
use App\Models\Action;
use App\Models\Store;
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
        $userLat = request('latitude');
        $userLon = request('longitude');

        $query = Store::query()->select(['id', 'name', 'address', 'city', 'country', 'latitude', 'longitude']);

        // If user location is provided, calculate distance and sort by it
        if ($userLat !== null && $userLon !== null) {
            // Haversine formula to calculate distance in kilometers
            $query->selectRaw(
                '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                [$userLat, $userLon, $userLat]
            )
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->orderBy('distance');
        } else {
            // Default sorting by address
            $query->orderBy('address');
        }

        $stores = $query->get();

        return Inertia::render('actions/create', [
            'stores' => $stores,
            'userLocation' => $userLat && $userLon ? ['latitude' => $userLat, 'longitude' => $userLon] : null,
        ]);
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
