import { Badge } from '@/components/ui/badge';
import { type User } from '@/types';

interface ActionCardProps {
    action: {
        id: number;
        packages_flipped: number;
        shrimp_helped: number;
        notes?: string | null;
        created_at: string;
        verification_status?: 'pending' | 'verified' | 'rejected';
        user?: User;
        store: {
            name: string;
            address: string;
        } | null;
    };
    showUser?: boolean;
    showVerification?: boolean;
    showNotes?: boolean;
}

function VerificationBadge({
    status,
}: {
    status: 'pending' | 'verified' | 'rejected';
}) {
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

export function ActionCard({
    action,
    showUser = true,
    showVerification = false,
    showNotes = false,
}: ActionCardProps) {
    const displayName = showUser ? action.user?.name : 'You';

    return (
        <div className="flex items-start justify-between gap-4 rounded-lg border border-transparent bg-background/50 p-3 transition-colors hover:border-border hover:bg-background/80">
            <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{displayName}</span>
                    <span className="text-sm text-muted-foreground">
                        flipped{' '}
                        <span className="font-semibold text-foreground">
                            {action.packages_flipped}
                        </span>{' '}
                        packages
                    </span>
                    {showVerification && action.verification_status && (
                        <VerificationBadge status={action.verification_status} />
                    )}
                </div>
                {action.store && (
                    <p className="text-xs text-muted-foreground">
                        📍 {action.store.address}
                    </p>
                )}
                {showNotes && action.notes && (
                    <p className="text-xs text-muted-foreground italic">
                        {action.notes}
                    </p>
                )}
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    {action.shrimp_helped.toLocaleString()} shrimp
                </span>
                <span className="text-xs text-muted-foreground">
                    {new Date(action.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}
