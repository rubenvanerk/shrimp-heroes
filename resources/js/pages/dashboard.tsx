import { Leaderboard } from '@/components/leaderboard';
import { RecentActions } from '@/components/recent-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface LeaderboardUser extends User {
    total_shrimp_helped: number;
    total_actions: number;
    rank?: number;
}

interface Action {
    id: number;
    packages_flipped: number;
    shrimp_helped: number;
    notes: string | null;
    created_at: string;
    user: User;
    store: {
        name: string;
        address: string;
    } | null;
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
    recentActions: Action[];
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
    recentActions,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 pb-24 md:pb-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/actions/create">
                            <Plus className="size-5" />
                            Record Action
                        </Link>
                    </Button>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Packages Flipped
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tabular-nums text-purple-700 dark:text-purple-400">
                                {globalStats.totalPackagesFlipped.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total packages flipped globally
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Shrimp Helped
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tabular-nums text-blue-700 dark:text-blue-400">
                                {globalStats.totalShrimpHelped.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total shrimp helped
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Actions Taken
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tabular-nums text-orange-700 dark:text-orange-400">
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

                <RecentActions actions={recentActions} />
            </div>
        </AppLayout>
    );
}
