import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, Camera, CircleHelp, Eye, Hand, Heart, Store } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guide',
        href: '/guide',
    },
];

const steps = [
    {
        number: 1,
        title: 'Visit Your Local Aldi',
        description:
            'Head to the nearest Aldi store. The shrimp products are usually in the frozen or refrigerated sections.',
        icon: Store,
        color: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
        number: 2,
        title: 'Locate Shrimp Products',
        description: 'Look for any packages containing shrimp - frozen shrimp, breaded shrimp, shrimp rings, etc.',
        icon: Eye,
        color: 'bg-pink-100 dark:bg-pink-900/20',
    },
    {
        number: 3,
        title: 'Flip Them Upside Down',
        description:
            'Carefully turn the packages upside down on the shelf. This makes them less appealing to shoppers and requires staff to fix them.',
        icon: Hand,
        color: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
        number: 4,
        title: 'Take a Quick Photo (Optional)',
        description: "Snap a photo of your work if you'd like to share proof of your action!",
        icon: Camera,
        color: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
        number: 5,
        title: 'Report Your Action',
        description: 'Use the dashboard to log how many products you flipped. Every package = 34 shrimp helped!',
        icon: BookOpen,
        color: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
        number: 6,
        title: 'Feel Amazing!',
        description: "You've just taken a stand for shrimp welfare. You're making a real difference!",
        icon: Heart,
        color: 'bg-rose-100 dark:bg-rose-900/20',
    },
];

const faqs = [
    {
        question: 'Is this legal?',
        answer: 'Yes! Simply turning products around is completely legal. You\'re not damaging anything or stealing - just rearranging the display.',
    },
    {
        question: 'What if store staff approach me?',
        answer: 'Be polite and honest. You can say you\'re concerned about shrimp welfare. Most staff will simply ask you to stop or leave, which is their right.',
    },
    {
        question: 'How does flipping products help shrimp?',
        answer: 'When products are displayed upside down, customers are less likely to purchase them. This sends a message to Aldi that shoppers are concerned about their shrimp sourcing practices, and requires staff time to fix displays.',
    },
    {
        question: 'Can I do this at other stores?',
        answer: 'While this movement focuses on Aldi, the concept can apply anywhere. However, always follow store policies and be respectful.',
    },
    {
        question: 'How many products should I flip?',
        answer: 'As many as you feel comfortable with! Even flipping one package makes a difference. Some heroes flip entire sections.',
    },
];

export default function Guide() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="How It Works" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div className="text-center">
                        <h1 className="mb-2 text-3xl font-bold">How It Works</h1>
                        <p className="text-lg text-muted-foreground">Simple actions, big impact!</p>
                    </div>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10">
                        <CardHeader>
                            <CardTitle>Why Does This Work?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="leading-relaxed">
                                When products are displayed upside down, customers are less likely to purchase them.
                                This sends a message to Aldi that shoppers are concerned about their shrimp sourcing
                                practices.
                            </p>
                            <p className="leading-relaxed">
                                Plus, it requires store staff to spend time fixing displays, making them aware of the
                                issue. It's a peaceful, legal way to protest shrimp cruelty!
                            </p>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        {steps.map((step) => (
                            <Card key={step.number} className={step.color}>
                                <CardContent className="flex items-start gap-4 p-6">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/50 dark:bg-black/20">
                                        <step.icon className="size-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="flex size-8 items-center justify-center rounded-full bg-white/70 font-bold dark:bg-black/30">
                                                {step.number}
                                            </span>
                                            <h3 className="flex-1 text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <CircleHelp className="mx-auto mb-3 size-12 text-muted-foreground" />
                        <h2 className="mb-2 text-2xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Everything you need to know</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <Card key={index}>
                                <CardContent className="p-5">
                                    <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                                    <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
