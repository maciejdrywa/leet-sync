import {Button} from "@/shared/components/ui/button.tsx";
import OnboardingLayout from "@/popup/layouts/OnboardingLayout.tsx";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import IconLeetcode from "@/shared/components/icons/IconLeetcode.tsx";

export default function LeetcodeStep() {
    const { leetcodeLogin } = useAuth();

    return (
        <OnboardingLayout
            icon={<IconLeetcode size={40}/>}
            iconShadowColor={"yellow"}
            title={"Connect LeetCode"}
            description={"Connect your LeetCode account to sync accepted solutions automatically."}
            currentStep={3}
        >
            {/*Button section*/}
            <Button
                variant={"outline"}
                size={"lg"}
                onClick={leetcodeLogin}
                className={"w-full h-13 rounded-2xl border-leetcode text-leetcode transition-all duration-200 hover:bg-leetcode/5 hover:shadow-sm"}
            >
                <IconLeetcode />
                Continue with LeetCode
            </Button>
        </OnboardingLayout>
    )
}