import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type User } from '@/types';
import { Clock } from 'lucide-react';

interface Action {
    id: number;
    packages_flipped: number;
    shrimp_helped: number;
    notes: string | null;
    performed_at: string;
    user: User;
    store: {
        name: string;
        address: string;
    } | null;
}

interface RecentActionsProps {
    actions: Action[];
}

export function RecentActions({ actions }: RecentActionsProps) {
    if (actions.length === 0) {
        return (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-950/20 dark:to-emerald-900/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="size-5" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                        No actions recorded yet. Be the first hero!
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-950/20 dark:to-emerald-900/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="size-5" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className="flex items-start justify-between gap-4 rounded-lg border border-transparent bg-background/50 p-3 transition-colors hover:border-border hover:bg-background/80"
                        >
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {action.user.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        flipped{' '}
                                        <span className="font-semibold text-foreground">
                                            {action.packages_flipped}
                                        </span>{' '}
                                        packages
                                    </span>
                                </div>
                                {action.store && (
                                    <p className="text-xs text-muted-foreground">
                                        📍 {action.store.address}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                    {action.shrimp_helped.toLocaleString()}{' '}
                                    shrimp
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(
                                        action.performed_at,
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
