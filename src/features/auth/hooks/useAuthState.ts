import type {AuthState} from "../auth.types.ts";
import {useState} from "react";

const initialAuthState = {
    github: null
}

export function useAuthState() {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);
    const [authLoading] = useState(true);

    const [authError, setAuthError] = useState<string | null>(null);

    async function githubLogin() {
        try {
            setAuthError(null);

            const response = await chrome.runtime.sendMessage({
                type: "GITHUB_LOGIN"
            })

            if (response.ok !== true) {
                setAuthError(response.error);
                return;
            }

            setAuthState(prev => ({
                ...prev,
                github: response.data
            }));
        }
        catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Failed to login with github"
            );
        }
    }

    async function logout() {
        try {
            setAuthError(null);


        }
        catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Failed to logout"
            )
        }
    }

    return {
        authState,
        authLoading,
        authError,
        githubLogin,
        logout
    }
}