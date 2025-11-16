import { Leaderboard } from '@/components/leaderboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';

interface LeaderboardUser extends User {
    total_shrimp_helped: number;
    total_actions: number;
    rank?: number;
}

interface DashboardProps {
    globalStats: {
        totalPackagesFlipped: number;
        totalShrimpHelped: number;
        totalActions: number;
    };
    leaderboard: LeaderboardUser[];
    currentUserStats: LeaderboardUser;
    currentUserInTop10: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    globalStats,
    leaderboard,
    currentUserStats,
    currentUserInTop10,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Packages Flipped
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tabular-nums">
                                {globalStats.totalPackagesFlipped.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total packages flipped globally
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Shrimp Helped
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tabular-nums">
                                {globalStats.totalShrimpHelped.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total shrimp saved from cruel fate
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Actions Taken
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tabular-nums">
                                {globalStats.totalActions.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total heroic actions recorded
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Leaderboard
                    leaderboard={leaderboard}
                    currentUserStats={currentUserStats}
                    currentUserInTop10={currentUserInTop10}
                />
            </div>
        </AppLayout>
    );
}
