
import {Button} from "@/shared/components/ui/button.tsx";
import OnboardingLayout from "@/popup/layouts/OnboardingLayout.tsx";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import IconGithub from "@/shared/components/icons/IconGithub.tsx";

export default function GithubStep() {
    const {githubLogin, } = useAuth()

    return (
        <OnboardingLayout
            icon={<IconGithub size={40}/>}
            iconShadowColor={"black"}
            title={"Connect GitHub"}
            description={"Connect your GitHub account to automatically save your LeetCode solutions."}
            currentStep={2}
        >
            {/*Button section*/}
            <Button
                variant={"default"}
                size={"lg"}
                onClick={githubLogin}
                className={"w-full h-13 rounded-2xl"}
            >
                <IconGithub size={60} color={"var(--color-app-surface)"} />
                Continue with GitHub
            </Button>
        </OnboardingLayout>
    )
}