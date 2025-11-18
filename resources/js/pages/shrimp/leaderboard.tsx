import { Head, Link } from '@inertiajs/react';

interface User {
    id: string;
    name: string;
    totalShrimpHelped: number;
    country: string;
}

interface LeaderboardProps {
    users: User[];
}

export default function Leaderboard({ users = [] }: LeaderboardProps) {
    // Mock data if none provided
    const leaderboardData =
        users.length > 0
            ? users
            : [
                  {
                      id: '1',
                      name: 'Shrimp Warrior',
                      totalShrimpHelped: 5420,
                      country: 'Japan',
                  },
                  {
                      id: '2',
                      name: 'Ocean Guardian',
                      totalShrimpHelped: 4890,
                      country: 'USA',
                  },
                  {
                      id: '3',
                      name: 'Reef Protector',
                      totalShrimpHelped: 3750,
                      country: 'Australia',
                  },
                  {
                      id: '4',
                      name: 'Marine Hero',
                      totalShrimpHelped: 2650,
                      country: 'UK',
                  },
                  {
                      id: '5',
                      name: 'Shrimp Saver',
                      totalShrimpHelped: 1820,
                      country: 'Canada',
                  },
              ];

    return (
        <>
            <Head title="Leaderboard" />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                        <Link href="/shrimp" className="text-2xl">
                            ←
                        </Link>
                        <h1 className="text-2xl font-bold text-rose-600">
                            🏆 Leaderboard
                        </h1>
                        <div className="w-8"></div>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="mx-auto max-w-4xl px-4 py-8">
                    <div className="rounded-lg bg-white shadow-md">
                        {leaderboardData.map((user, index) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between border-b border-gray-200 p-6 last:border-b-0"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Rank */}
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${
                                            index === 0
                                                ? 'bg-yellow-500 text-white'
                                                : index === 1
                                                  ? 'bg-gray-400 text-white'
                                                  : index === 2
                                                    ? 'bg-orange-400 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {index + 1}
                                    </div>

                                    {/* User Info */}
                                    <div>
                                        <p className="font-bold text-gray-800">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {user.country}
                                        </p>
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-rose-500">
                                        {user.totalShrimpHelped.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        shrimp saved
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Keep saving shrimp to climb the leaderboard! 🦐</p>
                    </div>
                </div>
            </div>
        </>
    );
}
