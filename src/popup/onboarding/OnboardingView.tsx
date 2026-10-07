import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import {useEffect, useMemo, useState} from "react";
import type {AuthState} from "@/features/auth/auth.types.ts";
import type {GithubRepository} from "@/features/repositories/repositories.types.ts";
import WelcomeStep from "@/popup/onboarding/steps/WelcomeStep.tsx";
import GithubStep from "@/popup/onboarding/steps/GithubStep.tsx";
import LeetcodeStep from "@/popup/onboarding/steps/LeetcodeStep.tsx";
import RepositoryStep from "@/popup/onboarding/steps/RepositoryStep.tsx";

type OnboardingStep = "welcome" | "github" | "leetcode" | "repositories" | "complete";

function getCurrentStep(authState: AuthState, selectedRepository: GithubRepository | null, welcomeComplete: boolean): OnboardingStep {
    if (!authState.github && !authState.leetcode && !selectedRepository && !welcomeComplete) {
        return "welcome";
    }
    else if (!authState.github) {
        return "github";
    }
    else if (!authState.leetcode) {
        return "leetcode";
    }

    else if (!selectedRepository) {
        return "repositories";
    }
    else {
        return "complete";
    }
}

export default function OnboardingView() {
    const { authState, authLoading } = useAuth();
    const { selectedRepository, selectedRepositoryLoading } = useRepositories();
    const [welcomeComplete, setWelcomeComplete] = useState(false);

    const step = useMemo(() =>
        getCurrentStep(authState, selectedRepository, welcomeComplete),
        [authState, selectedRepository, welcomeComplete]);

    useEffect(() => {
        if (
            authLoading ||
            selectedRepositoryLoading ||
            authState.github ||
            authState.leetcode ||
            selectedRepository
        )
            return

        setWelcomeComplete(false);
    }, [
        authState.github,
        authState.leetcode,
        selectedRepository,
        authLoading,
        selectedRepositoryLoading,
    ]);


    switch (step) {
        case "welcome": {
            return <WelcomeStep
                onStarted={() => setWelcomeComplete(true)}
            />;
        }
        case "github": {
            return <GithubStep />;
        }
        case "leetcode": {
            return <LeetcodeStep />;
        }
        case "repositories": {
            return <RepositoryStep />
        }
        case "complete":
        default: {
            return null;
        }
    }
}