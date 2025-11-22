import { ActionCard } from '@/components/action-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { create } from '@/routes/actions';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Action {
    id: number;
    packages_flipped: number;
    shrimp_helped: number;
    notes: string | null;
    created_at: string;
    verification_status: 'pending' | 'verified' | 'rejected';
    store: {
        name: string;
        address: string;
    } | null;
}

interface DashboardProps {
    actions: {
        data: Action[];
        current_page: number;
        last_page: number;
    };
    userStats: {
        totalPackagesFlipped: number;
        totalShrimpHelped: number;
        totalActions: number;
    };
    userName: string;
}

export default function Dashboard({ actions, userStats, userName }: DashboardProps) {
    const hasPendingVerifications = actions.data.some(
        (action) => action.verification_status === 'pending',
    );

    useEffect(() => {
        if (!hasPendingVerifications) {
            return;
        }

        const interval = setInterval(() => {
            router.reload({ only: ['actions'], preserveScroll: true });
        }, 1000);

        return () => clearInterval(interval);
    }, [hasPendingVerifications]);

    const firstName = userName.split(' ')[0];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome back, {firstName}!
                        </h1>
                        <p className="text-muted-foreground">
                            Track your shrimp-saving progress
                        </p>
                    </div>

                    <Link href={create().url}>
                        <Button>Report New Action</Button>
                    </Link>
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
                                {userStats.totalPackagesFlipped.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total packages you've flipped
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
                                {userStats.totalShrimpHelped.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Total shrimp you've helped
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
                                {userStats.totalActions.toLocaleString()}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Your heroic actions recorded
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {actions.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-950/40 dark:to-pink-950/40 border border-orange-200 dark:border-orange-900/50 shadow-lg">
                                    <span className="text-6xl drop-shadow">🦐</span>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">
                                    No actions reported yet
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Start reporting your shrimp-saving actions
                                    today!
                                </p>
                                <Link href={create().url} className="mt-4">
                                    <Button>Report Your First Action</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {actions.data.map((action) => (
                                    <ActionCard
                                        key={action.id}
                                        action={action}
                                        showUser={false}
                                        showVerification={true}
                                        showNotes={true}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
