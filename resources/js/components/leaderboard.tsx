import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { User } from '@/types';

interface LeaderboardUser extends User {
    total_shrimp_helped: number;
    total_actions: number;
    rank?: number;
}

interface LeaderboardProps {
    leaderboard: LeaderboardUser[];
    currentUserStats: LeaderboardUser;
    currentUserInTop10: boolean;
}

export function Leaderboard({
    leaderboard,
    currentUserStats,
    currentUserInTop10,
}: LeaderboardProps) {
    const isCurrentUser = (userId: number) => userId === currentUserStats.id;

    const getRankBadgeVariant = (rank: number) => {
        if (rank === 1) return 'default';
        if (rank === 2 || rank === 3) return 'secondary';
        return 'outline';
    };

    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const renderUserRow = (
        user: LeaderboardUser,
        rank: number,
        isCurrentUserRow = false,
    ) => (
        <div
            key={user.id}
            className={cn(
                'flex items-center gap-4 rounded-lg border p-4 transition-colors',
                isCurrentUserRow &&
                    'border-primary bg-primary/5 ring-2 ring-primary/20 dark:bg-primary/10',
                !isCurrentUserRow && 'border-transparent hover:bg-muted/50',
            )}
        >
            <Badge
                variant={getRankBadgeVariant(rank)}
                className="min-w-8 justify-center"
            >
                #{rank}
            </Badge>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-full rounded-full object-cover"
                    />
                ) : (
                    getUserInitials(user.name)
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{user.name}</span>
                    {isCurrentUserRow && (
                        <Badge variant="secondary" className="text-xs">
                            You
                        </Badge>
                    )}
                </div>
                <span className="text-xs text-muted-foreground">
                    {user.total_actions.toLocaleString()}{' '}
                    {user.total_actions === 1 ? 'action' : 'actions'}
                </span>
            </div>

            <div className="text-right">
                <div className="font-semibold tabular-nums">
                    {user.total_shrimp_helped.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                    shrimp helped
                </div>
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {leaderboard.map((user, index) =>
                    renderUserRow(user, index + 1, isCurrentUser(user.id)),
                )}

                {!currentUserInTop10 && (
                    <>
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-dashed" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-card px-2 text-xs text-muted-foreground">
                                    Your ranking
                                </span>
                            </div>
                        </div>
                        {renderUserRow(
                            currentUserStats,
                            currentUserStats.rank ?? 11,
                            true,
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
