<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoreSearchController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $search = $request->input('search', '');
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');

        $query = Store::query()->select(['id', 'name', 'address', 'city', 'country', 'latitude', 'longitude']);

        // If search query provided, filter by address, city, or name
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('address', 'LIKE', "%{$search}%")
                    ->orWhere('city', 'LIKE', "%{$search}%")
                    ->orWhere('name', 'LIKE', "%{$search}%");
            });
        }

        // If user location provided, calculate distance and sort by it
        if ($latitude !== null && $longitude !== null) {
            // Haversine formula for distance calculation
            $query->selectRaw(
                '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                [$latitude, $longitude, $latitude]
            )
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->orderBy('distance');
        } else {
            // Default sorting by address
            $query->orderBy('address');
        }

        // Limit results to 50 stores
        $stores = $query->limit(50)->get();

        return response()->json($stores);
    }
}
