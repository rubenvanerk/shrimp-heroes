import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { index, create } from '@/routes/actions';
import { useState } from 'react';

interface SuccessProps {
    packagesFlipped: number;
    totalPackagesFlipped: number;
    totalActions: number;
    shrimpPerPackage: number;
}

const shrimpPuns = [
    "You're making waves in the shrimp world!",
    "That's shrimply amazing!",
    "You're on a roll... err, shell!",
    "Flip yeah! You're crushing it!",
    "You're the real MVP (Most Valuable Prawn)!",
    "Shell shocked by your dedication!",
    "You're krilling it out there!",
    "That's one small flip for shrimp, one giant leap for shrimpkind!",
    "You've got serious shrimp game!",
    "Seas the day, you absolute legend!",
    "You're making a splash in the best way!",
    "Talk about being shell-fish with kindness!",
    "You're really swimming against the tide!",
    "That's what I call shrimpressive work!",
    "You're the catch of the day!",
];

export default function Success({
    packagesFlipped,
    totalPackagesFlipped,
    totalActions,
    shrimpPerPackage,
}: SuccessProps) {
    const shrimpHelped = packagesFlipped * shrimpPerPackage;
    const totalShrimpHelped = totalPackagesFlipped * shrimpPerPackage;
    const [randomPun] = useState(
        () => shrimpPuns[Math.floor(Math.random() * shrimpPuns.length)]
    );

    return (
        <AppLayout>
            <Head title="Action Reported!" />

            <div className="mx-auto w-full max-w-2xl space-y-8 text-center pt-8">
                    {/* Celebration Header */}
                    <div className="space-y-4">
                        <div className="text-8xl">🎉</div>
                        <h1 className="text-5xl md:text-6xl font-black text-purple-600 dark:text-purple-400">
                            Amazing Work!
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-400">
                            You just helped{' '}
                            <span className="font-bold text-purple-600 dark:text-purple-400">
                                {shrimpHelped.toLocaleString()} shrimp
                            </span>
                            !
                        </p>
                        <p className="text-xl italic text-gray-500 dark:text-gray-500">
                            {randomPun}
                        </p>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-3xl p-8 shadow-lg border-2 border-purple-200 dark:border-purple-800">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                            Your Total Impact
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <div className="text-5xl font-black text-purple-600 dark:text-purple-400">
                                    {totalPackagesFlipped.toLocaleString()}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Packages Flipped
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-5xl font-black text-purple-600 dark:text-purple-400">
                                    {totalShrimpHelped.toLocaleString()}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Shrimp Helped
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-5xl font-black text-purple-600 dark:text-purple-400">
                                    {totalActions}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Actions
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="px-8 py-6 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg"
                        >
                            <Link href={create().url}>🦐 Log Another Flip</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="px-8 py-6 text-xl font-bold rounded-2xl"
                        >
                            <Link href={index().url}>View All Actions</Link>
                        </Button>
                    </div>
            </div>
        </AppLayout>
    );
}
