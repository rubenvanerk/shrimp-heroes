import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { create, index } from '@/routes/actions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Actions',
        href: index().url,
    },
];

interface Action {
    id: number;
    packages_flipped: number;
    notes: string | null;
    created_at: string;
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Actions" />

            <div className="space-y-6 p-4">
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
                                Start reporting your shrimp-saving actions today!
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
                                                {action.packages_flipped} packages flipped
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
