<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $shrimpPerPackage = config('shrimp-heroes.shrimp_per_package');
        $totalPackagesFlipped = Action::sum('packages_flipped');

        $globalStats = [
            'totalPackagesFlipped' => $totalPackagesFlipped,
            'totalShrimpHelped' => $totalPackagesFlipped * $shrimpPerPackage,
            'totalActions' => Action::count(),
        ];

        // Get all users with their action stats
        $allUsers = User::query()
            ->withSum('actions as total_packages_flipped', 'packages_flipped')
            ->withCount('actions as total_actions')
            ->get()
            ->map(function ($user) use ($shrimpPerPackage) {
                $user->total_packages_flipped = $user->total_packages_flipped ?? 0;
                $user->total_shrimp_helped = $user->total_packages_flipped * $shrimpPerPackage;

                return $user;
            })
            ->sortByDesc('total_packages_flipped')
            ->values();

        // Top 10 leaderboard
        $leaderboard = $allUsers->take(10);

        // Current user stats with rank
        $currentUser = auth()->user();
        $currentUserIndex = $allUsers->search(fn ($user) => $user->id === $currentUser->id);
        $currentUserStats = $allUsers[$currentUserIndex];
        $currentUserStats->rank = $currentUserIndex + 1;

        $currentUserInTop10 = $currentUserIndex < 10;

        $recentActions = Action::query()
            ->with(['user', 'store'])
            ->latest('performed_at')
            ->limit(5)
            ->get()
            ->map(function ($action) use ($shrimpPerPackage) {
                $action->shrimp_helped = $action->packages_flipped * $shrimpPerPackage;

                return $action;
            });

        return Inertia::render('dashboard', [
            'globalStats' => $globalStats,
            'leaderboard' => $leaderboard,
            'currentUserStats' => $currentUserStats,
            'currentUserInTop10' => $currentUserInTop10,
            'recentActions' => $recentActions,
        ]);
    }
}
