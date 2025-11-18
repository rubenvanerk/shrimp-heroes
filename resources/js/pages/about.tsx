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
        step: 'You flip shrimp packages at Aldi stores near you',
        description: 'Head to your local store and flip packages',
        color: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
        step: 'Other customers buy less shrimp products',
        description:
            'Upside down products look unappealing and are less likely to be bought',
        color: 'bg-pink-100 dark:bg-pink-900/20',
    },
    {
        step: 'Store manager reports annoyance to Aldi HQ',
        description:
            'Employees need to spend time re-arranging products. Managers get annoyed and inform their superiors.',
        color: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
        step: 'Aldi bosses hear about protest actions from all over Europe',
        description:
            'Hundreds of actions, together with store protests, emails and ads make clear that people demand change from Aldi.',
        color: 'bg-cyan-100 dark:bg-cyan-900/20',
    },
    {
        step: 'Aldi mandates their farmers to end the worst shrimp cruelty',
        description:
            "By updating their animal welfare guidelines, Aldi will follow. Hundreds of actions, together with store protests, emails and ads make clear that people won't tolerate.",
        color: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
        step: 'Shrimp are helped',
        description:
            'When farmers stop cutting off mother shrimp eyes and use effective methods to stun the shrimp before slaughter, the animals are spared unnecessary suffering.',
        color: 'bg-green-100 dark:bg-green-900/20',
    },
];

export default function About() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="How your action helps shrimp" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 pb-24 md:pb-4">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div className="space-y-4 text-center">
                        <div>
                            <h1 className="mb-4 text-4xl font-bold">
                                How your action helps shrimp
                            </h1>
                            <h2 className="mb-4 text-2xl font-semibold text-foreground">
                                Did you know that prawns at Aldi have their eyes
                                cut off while they are fully conscious, and
                                suffocate to death without proper stunning?
                            </h2>
                            <h3 className="mt-4 text-xl font-semibold text-primary">
                                Your action can help Aldi ban this cruelty
                            </h3>
                        </div>
                    </div>

                    <Card className="border-red-200 bg-gradient-to-br from-red-50 to-orange-50 dark:border-red-900/30 dark:from-red-950/20 dark:to-orange-900/10">
                        <CardContent className="p-6">
                            <p className="text-base leading-relaxed text-muted-foreground">
                                Every package you flip contributes to a larger
                                movement that creates real pressure for change.
                                Here's exactly how your simple action creates a
                                ripple effect that ultimately stops Aldi shrimps
                                from having their eyes cut off and being
                                suffocated to death.
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
                                            <h3 className="font-bold">
                                                {item.step}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
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

                    <Card className="border-primary/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-900/10">
                        <CardContent className="p-6 text-center">
                            <p className="text-lg font-semibold">
                                Every package flipped brings us closer to ending
                                shrimp cruelty.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
