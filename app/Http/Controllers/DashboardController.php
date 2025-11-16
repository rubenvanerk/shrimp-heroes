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
        $globalStats = [
            'totalShrimpHelped' => Action::sum('packages_flipped'),
            'totalActions' => Action::count(),
        ];

        $leaderboard = User::query()
            ->select('users.*')
            ->selectRaw('COALESCE(SUM(actions.packages_flipped), 0) as total_shrimp_helped')
            ->selectRaw('COUNT(actions.id) as total_actions')
            ->leftJoin('actions', 'users.id', '=', 'actions.user_id')
            ->groupBy('users.id')
            ->orderByDesc('total_shrimp_helped')
            ->limit(10)
            ->get();

        $currentUser = auth()->user();
        $currentUserStats = User::query()
            ->select('users.*')
            ->selectRaw('COALESCE(SUM(actions.packages_flipped), 0) as total_shrimp_helped')
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

        $currentUserInTop10 = $leaderboard->contains('id', $currentUser->id);

        return Inertia::render('dashboard', [
            'globalStats' => $globalStats,
            'leaderboard' => $leaderboard,
            'currentUserStats' => $currentUserStats,
            'currentUserInTop10' => $currentUserInTop10,
        ]);
    }
}
