import { Head, Link } from '@inertiajs/react';

export default function Guide() {
    const guides = [
        {
            icon: '🚑',
            title: 'Rescue Operations',
            description:
                'Learn how to safely rescue stranded shrimp and return them to water.',
        },
        {
            icon: '🏡',
            title: 'Habitat Protection',
            description:
                'Discover ways to protect and restore shrimp habitats in your area.',
        },
        {
            icon: '🧹',
            title: 'Beach Cleanup',
            description:
                'Organize or join beach cleanups to keep shrimp environments clean.',
        },
        {
            icon: '📚',
            title: 'Education',
            description:
                'Share knowledge about shrimp conservation with your community.',
        },
    ];

    return (
        <>
            <Head title="Guide" />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                        <Link href="/shrimp" className="text-2xl">
                            ←
                        </Link>
                        <h1 className="text-2xl font-bold text-rose-600">
                            📖 Guide
                        </h1>
                        <div className="w-8"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-4xl px-4 py-8">
                    {/* Welcome Message */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">
                            Welcome, Shrimp Hero! 🦐
                        </h2>
                        <p className="text-gray-600">
                            This guide will help you understand different ways
                            you can help save shrimp and contribute to marine
                            conservation. Every action matters, no matter how
                            small!
                        </p>
                    </div>

                    {/* Guide Cards */}
                    <div className="space-y-6">
                        {guides.map((guide, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-white p-6 shadow-md"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="text-5xl">{guide.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {guide.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600">
                                    {guide.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 rounded-lg bg-rose-500 p-6 text-center shadow-md">
                        <h3 className="mb-2 text-xl font-bold text-white">
                            Ready to take action?
                        </h3>
                        <p className="mb-4 text-rose-100">
                            Start reporting your shrimp-saving activities today!
                        </p>
                        <Link
                            href="/shrimp/report"
                            className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-rose-500 shadow-md transition hover:bg-rose-50"
                        >
                            Report Your First Action
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
