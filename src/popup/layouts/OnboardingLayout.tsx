import type {ReactNode} from "react";
import {Button} from "@/shared/components/ui/button.tsx";
import type {Variants} from "motion";
import { motion } from "motion/react";
import {LucideRefreshCw} from "lucide-react";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import OnboardingProgress from "@/popup/components/OnboardingProgress.tsx";

type OnboardingLayoutProps = {
    icon: ReactNode;
    iconShadowColor: "black" | "yellow" | "mixed"
    title: string;
    description: string;
    currentStep: number;
    children: ReactNode;
}

// Wrapper for box shadow in tailwindcss
const colorWrapper = {
    black: "shadow-[0_10px_24px_rgb(0_0_0_/_0.18),0_4px_10px_rgb(0_0_0_/_0.10)]",
    yellow: "shadow-[0_8px_20px_rgb(17_24_39_/_0.08),0_0_24px_var(--color-leetcode-glow),0_0_56px_var(--color-leetcode-glow-soft)]",
    mixed: "shadow-[-10px_-10px_24px_rgb(0_0_0_/_0.14),8px_10px_24px_var(--color-leetcode-glow),14px_16px_40px_var(--color-leetcode-glow-soft)]"
}

// Main animation container
const containerVariants: Variants = {
    hidden: {
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.08,
            staggerDirection: -1,
        },
    },
    visible: {
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.08,
            staggerDirection: 1,
        },
    },
};

// Logo animations
const logoVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.92,
        y: 4,
    },

    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut",
        },
    },
};

// Other elements animations
const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 6,
    },

    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

export default function OnboardingLayout({icon, iconShadowColor, title, description, currentStep, children}: OnboardingLayoutProps) {
    const { logout } = useAuth();

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={"flex relative flex-col py-6 px-4 items-center gap-4"}
        >

            {/*Logo*/}
            <motion.div
                variants={logoVariants}
                className={`flex items-center justify-center w-20 h-20 bg-app-surface border border-app-border rounded-2xl ${colorWrapper[iconShadowColor]}`}
            >
                {icon}
            </motion.div>

            {/*Progress bar*/}
            <OnboardingProgress
                currentStep={currentStep}
                totalSteps={4}
            />

            {/*Title and description section*/}
            <div className={"flex flex-col items-center px-4"}>
                <motion.p
                    variants={itemVariants}
                    className={"text-app-text text-xl font-semibold text-center"}
                >
                    {title}
                </motion.p>
                <motion.p
                    variants={itemVariants}
                    className={"text-app-muted text-sm font-normal text-center"}
                >
                    {description}
                </motion.p>
            </div>
            {/*Children section*/}
            <motion.div
                variants={itemVariants}
                className={"flex flex-col items-center px-4 w-full gap-2.5"}
            >
                {children}
            </motion.div>

            {/*Go back butto*/}
            {currentStep !== 1 && (
                <motion.div
                    variants={itemVariants}
                    className="absolute top-2 left-2"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground align-middle"
                        onClick={logout}
                    >
                        <LucideRefreshCw/>
                        Reset
                    </Button>
                </motion.div>
            )}
        </motion.div>
    )
}