import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { index } from '@/routes/actions';
import { router } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface CelebrationDialogProps {
    open: boolean;
    shrimpHelped: number;
    onClose?: () => void;
}

export function CelebrationDialog({
    open,
    shrimpHelped,
    onClose,
}: CelebrationDialogProps) {
    useEffect(() => {
        if (open) {
            // Trigger confetti animation
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = {
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 0,
            };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: {
                        x: randomInRange(0.1, 0.3),
                        y: Math.random() - 0.2,
                    },
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: {
                        x: randomInRange(0.7, 0.9),
                        y: Math.random() - 0.2,
                    },
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [open]);

    const handleContinue = () => {
        if (onClose) {
            onClose();
        } else {
            router.visit(index().url);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleContinue}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        🎉 Amazing Work! 🎉
                    </DialogTitle>
                    <DialogDescription className="space-y-4 pt-4 text-center">
                        <div className="text-4xl font-bold text-primary">
                            YOU JUST HELPED
                        </div>
                        <div className="text-6xl font-extrabold text-primary">
                            {shrimpHelped}
                        </div>
                        <div className="text-4xl font-bold text-primary">
                            SHRIMP! 🦐🎉
                        </div>
                        <p className="pt-4 text-base text-muted-foreground">
                            Thank you for taking action to help end shrimp
                            cruelty!
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center pt-4">
                    <Button onClick={handleContinue} size="lg">
                        Continue to Dashboard
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
