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

        $leaderboard = User::query()
            ->select('users.*')
            ->selectRaw('COALESCE(SUM(actions.packages_flipped), 0) as total_packages_flipped')
            ->selectRaw('COUNT(actions.id) as total_actions')
            ->leftJoin('actions', 'users.id', '=', 'actions.user_id')
            ->groupBy('users.id')
            ->orderByDesc('total_packages_flipped')
            ->limit(10)
            ->get()
            ->map(function ($user) use ($shrimpPerPackage) {
                $user->total_shrimp_helped = $user->total_packages_flipped * $shrimpPerPackage;

                return $user;
            });

        $currentUser = auth()->user();
        $currentUserStats = User::query()
            ->select('users.*')
            ->selectRaw('COALESCE(SUM(actions.packages_flipped), 0) as total_packages_flipped')
            ->selectRaw('COUNT(actions.id) as total_actions')
            ->selectRaw('(SELECT COUNT(*) FROM users u2
                LEFT JOIN actions a2 ON u2.id = a2.user_id
                GROUP BY u2.id
                HAVING COALESCE(SUM(a2.packages_flipped), 0) > COALESCE(SUM(actions.packages_flipped), 0)
            ) + 1 as rank')
            ->leftJoin('actions', 'users.id', '=', 'actions.user_id')
            ->where('users.id', $currentUser->id)
            ->groupBy('users.id')
            ->first();

        $currentUserStats->total_shrimp_helped = $currentUserStats->total_packages_flipped * $shrimpPerPackage;

        $currentUserInTop10 = $leaderboard->contains('id', $currentUser->id);

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
