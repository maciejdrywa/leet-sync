import PopupLayout from "@/popup/layouts/PopupLayout.tsx";
import {Dashboard} from "@/popup/views/Dashboard.tsx";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import OnboardingView from "@/popup/onboarding/OnboardingView.tsx";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import LoadingScreen from "@/popup/components/LoadingScreen.tsx";


function App() {

    const { authState, authError, authLoading } = useAuth();
    const { selectedRepository, selectedRepositoryError, selectedRepositoryLoading } = useRepositories();

    const onboardingComplete = authState.github && authState.leetcode && selectedRepository;

    const isLoading = authLoading || selectedRepositoryLoading;

    return (
        <PopupLayout>

            {isLoading ? (
                <LoadingScreen/>
            ) : !onboardingComplete
                ? <OnboardingView/>
                : <Dashboard/>
            }

            {authError && (
                <p className="px-4 pb-4 text-center text-sm text-app-danger">
                    {authError}
                </p>
            )}

            {selectedRepositoryError && (
                <p className="px-4 pb-4 text-center text-sm text-app-danger">
                    {selectedRepositoryError}
                </p>
            )}
        </PopupLayout>
    )
}

export default App
