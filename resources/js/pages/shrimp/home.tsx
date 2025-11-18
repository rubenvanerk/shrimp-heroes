import { Head, Link } from '@inertiajs/react';

interface HomeProps {
    globalShrimpHelped: number;
    userShrimpHelped: number;
}

export default function Home({
    globalShrimpHelped = 1247850,
    userShrimpHelped = 1250,
}: HomeProps) {
    return (
        <>
            <Head title="Shrimp Heroes" />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6">
                        <h1 className="text-3xl font-bold text-rose-600">
                            🦐 Shrimp Heroes
                        </h1>
                        <p className="text-sm text-gray-600">
                            Saving shrimp, one action at a time
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-8">
                    {/* Stats Cards */}
                    <div className="mb-8 grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <p className="text-sm font-bold text-gray-500">
                                GLOBAL IMPACT
                            </p>
                            <p className="text-4xl font-extrabold text-rose-500">
                                {globalShrimpHelped.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                Shrimp helped worldwide
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <p className="text-sm font-bold text-gray-500">
                                YOUR IMPACT
                            </p>
                            <p className="text-4xl font-extrabold text-orange-500">
                                {userShrimpHelped.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                                Shrimp you've helped
                            </p>
                        </div>
                    </div>

                    {/* Mascot Section */}
                    <div className="mb-8 rounded-lg bg-white p-8 text-center shadow-md">
                        <div className="text-8xl">🦐</div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">
                            Ready to make a difference?
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Every action counts. Start reporting and help save
                            shrimp today!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Link
                            href="/shrimp/report"
                            className="rounded-lg bg-rose-500 px-6 py-4 text-center font-bold text-white shadow-md transition hover:bg-rose-600"
                        >
                            📝 Report Action
                        </Link>

                        <Link
                            href="/shrimp/leaderboard"
                            className="rounded-lg bg-orange-500 px-6 py-4 text-center font-bold text-white shadow-md transition hover:bg-orange-600"
                        >
                            🏆 Leaderboard
                        </Link>

                        <Link
                            href="/shrimp/guide"
                            className="rounded-lg bg-blue-500 px-6 py-4 text-center font-bold text-white shadow-md transition hover:bg-blue-600"
                        >
                            📖 Guide
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
