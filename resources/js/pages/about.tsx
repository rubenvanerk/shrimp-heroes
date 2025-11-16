import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/about',
    },
];

const impactSteps = [
    {
        step: 'You visit Aldi',
        description: 'Head to your local store',
        color: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
        step: 'Flip shrimp packages',
        description: 'Turn products upside down on shelves',
        color: 'bg-pink-100 dark:bg-pink-900/20',
    },
    {
        step: 'Customers find shrimp less appealing & don\'t buy',
        description: 'Upside down products look unappealing and sales decrease',
        color: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
        step: 'Staff must fix displays',
        description: 'Employees spend time re-arranging products',
        color: 'bg-cyan-100 dark:bg-cyan-900/20',
    },
    {
        step: 'Store manager reports annoyance & HQ gets pressure',
        description: 'Managers notice the disruption and corporate hears about declining sales',
        color: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
        step: 'Aldi sees the need to change',
        description: 'Company bans cruel shrimp farming practices',
        color: 'bg-green-100 dark:bg-green-900/20',
    },
];

export default function About() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="How Shrimp Are Helped" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div className="text-center">
                        <h1 className="mb-2 text-3xl font-bold">How Shrimp Are Helped</h1>
                        <p className="text-lg text-muted-foreground">
                            Understanding the impact chain from action to change
                        </p>
                    </div>

                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-900/10">
                        <CardContent className="p-6">
                            <h2 className="mb-3 text-xl font-bold">The Power of Collective Action</h2>
                            <p className="leading-relaxed text-muted-foreground">
                                Every package you flip contributes to a larger movement that creates real pressure for
                                change. Here's exactly how your simple action creates a ripple effect that ultimately
                                helps shrimp escape cruel farming practices.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="space-y-0">
                        {impactSteps.map((item, index) => (
                            <div key={index}>
                                <Card className={item.color}>
                                    <CardContent className="flex items-center gap-4 p-5">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/70 font-bold dark:bg-black/30">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold">{item.step}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                {index < impactSteps.length - 1 && (
                                    <div className="flex justify-center py-2">
                                        <ArrowDown className="size-6 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-900/10">
                        <CardContent className="p-6">
                            <h2 className="mb-3 text-xl font-bold">Why This Works</h2>
                            <div className="space-y-3 text-muted-foreground">
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Economic Impact:</strong> When sales decline,
                                    Aldi's bottom line is affected. This speaks louder than petitions or emails.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Operational Disruption:</strong> Staff time
                                    spent fixing displays costs money and creates awareness at every level of the
                                    organization.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Pattern Recognition:</strong> When this happens
                                    consistently across multiple stores, corporate can't ignore it. They see it as a
                                    systemic issue requiring policy change.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">The End Goal:</strong> Pressure Aldi to only
                                    source shrimp from farms that don't use cruel practices like eyestalk ablation,
                                    overcrowding, and poor water quality.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/50 bg-gradient-to-br from-orange-50 to-peach-50 dark:from-orange-950/20 dark:to-orange-900/10">
                        <CardContent className="p-6 text-center">
                            <p className="text-lg font-semibold">
                                Every action counts. Every package flipped brings us closer to ending shrimp cruelty.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
