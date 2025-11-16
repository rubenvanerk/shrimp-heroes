import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/actions';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Actions',
        href: index().url,
    },
];

function getVerificationBadge(status: 'pending' | 'verified' | 'rejected') {
    switch (status) {
        case 'verified':
            return (
                <Badge
                    variant="default"
                    className="bg-green-600 dark:bg-green-700"
                >
                    ✓ Verified
                </Badge>
            );
        case 'rejected':
            return <Badge variant="destructive">✗ Rejected</Badge>;
        case 'pending':
        default:
            return (
                <Badge variant="secondary" className="gap-2">
                    <svg
                        className="size-3 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Verifying...
                </Badge>
            );
    }
}

interface Action {
    id: number;
    packages_flipped: number;
    notes: string | null;
    created_at: string;
    verification_status: 'pending' | 'verified' | 'rejected';
    store: {
        name: string;
    } | null;
}

interface ActionsIndexProps {
    actions: {
        data: Action[];
        current_page: number;
        last_page: number;
    };
}

export default function ActionsIndex({ actions }: ActionsIndexProps) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Actions" />

            <div className="space-y-6 p-4 pb-24 md:pb-4">
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title="My Actions"
                        description="Track all your shrimp-saving activities"
                    />

                    <Link href={create().url}>
                        <Button>Report New Action</Button>
                    </Link>
                </div>

                {actions.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="text-6xl">🦐</div>
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
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {actions.data.map((action) => (
                            <Card key={action.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle>
                                                {action.packages_flipped}{' '}
                                                packages flipped
                                            </CardTitle>
                                            <CardDescription>
                                                {new Date(
                                                    action.created_at,
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </CardDescription>
                                        </div>
                                        {getVerificationBadge(
                                            action.verification_status,
                                        )}
                                    </div>
                                </CardHeader>
                                {(action.notes || action.store) && (
                                    <CardContent>
                                        {action.store && (
                                            <p className="text-sm font-medium">
                                                📍 {action.store.name}
                                            </p>
                                        )}
                                        {action.notes && (
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {action.notes}
                                            </p>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
