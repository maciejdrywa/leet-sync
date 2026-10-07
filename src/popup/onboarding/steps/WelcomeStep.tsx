import {Button} from "@/shared/components/ui/button.tsx";
import { ArrowRight } from "lucide-react";
import OnboardingLayout from "@/popup/layouts/OnboardingLayout.tsx";
import IconLeetSync from "@/shared/components/icons/IconLeetSync.tsx";

type WelcomeStepProps = {
    onStarted: () => void;
}

export default function WelcomeStep({onStarted}: WelcomeStepProps) {
    return (
        <OnboardingLayout
            icon={<IconLeetSync size={50}/>}
            iconShadowColor={"mixed"}
            title={"Welcome to LeetSync"}
            description={"Automatically sync your accepted LeetCode solutions to GitHub. Connect your accounts and choose a repository to get started."}
            currentStep={1}
        >
            {/*Button section*/}
            <Button
                variant={"default"}
                size={"lg"}
                onClick={onStarted}
                className={"w-full h-13 rounded-2xl"}
            >
                Let's get started
                <ArrowRight size={18} />
            </Button>
        </OnboardingLayout>
    )
}