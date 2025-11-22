import { ActionCard } from '@/components/action-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type User } from '@/types';

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

interface RecentActionsProps {
    actions: Action[];
}

export function RecentActions({ actions }: RecentActionsProps) {
    if (actions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
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
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {actions.map((action) => (
                        <ActionCard
                            key={action.id}
                            action={action}
                            showUser={true}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
