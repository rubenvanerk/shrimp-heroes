<?php

namespace App\Http\Controllers;

use App\Models\Action;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $userId = auth()->id();

        $totalPackagesFlipped = (int) Action::where('user_id', $userId)->sum('packages_flipped');
        $totalActions = (int) Action::where('user_id', $userId)->count();

        $shrimpPerPackage = config('shrimp-heroes.shrimp_per_package');

        $actions = Action::query()
            ->where('user_id', $userId)
            ->with(['store', 'verification'])
            ->latest()
            ->paginate(15)
            ->through(fn ($action) => [
                'id' => $action->id,
                'packages_flipped' => $action->packages_flipped,
                'shrimp_helped' => $action->packages_flipped * $shrimpPerPackage,
                'notes' => $action->notes,
                'created_at' => $action->created_at,
                'verification_status' => $action->verification_status,
                'store' => $action->store,
            ]);

        return Inertia::render('dashboard', [
            'actions' => $actions,
            'userStats' => [
                'totalPackagesFlipped' => $totalPackagesFlipped,
                'totalShrimpHelped' => $totalPackagesFlipped * config('shrimp-heroes.shrimp_per_package'),
                'totalActions' => $totalActions,
            ],
            'userName' => auth()->user()->name,
        ]);
    }
}
