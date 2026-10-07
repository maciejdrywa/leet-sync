import { motion } from "motion/react";

type OnboardingProgressProps = {
    currentStep: number;
    totalSteps: number;
};

export default function OnboardingProgress({currentStep, totalSteps,}: OnboardingProgressProps) {
    return (
        <div className="flex items-center justify-center">
            <div className="flex justify-center gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const step = index + 1;
                    const active = step === currentStep;

                    return (
                        <div
                            key={step}
                            className="relative h-2 w-6 rounded-full"
                        >
                            <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-muted-foreground/30" />

                            {active && (
                                <motion.div
                                    layoutId="active-step"
                                    className="absolute inset-0 h-2 w-6 rounded-full bg-foreground"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}