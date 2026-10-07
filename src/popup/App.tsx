import PopupLayout from "@/popup/layouts/PopupLayout.tsx";
import {Dashboard} from "@/popup/views/Dashboard.tsx";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import OnboardingView from "@/popup/onboarding/OnboardingView.tsx";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";


function App() {

    const { authState } = useAuth();
    const { selectedRepository } = useRepositories();

    const onboardingComplete = authState.github && authState.leetcode && selectedRepository;

    return (
        <PopupLayout>
            {!onboardingComplete ? <OnboardingView /> : <Dashboard/>}
        </PopupLayout>
    )
}

export default App
