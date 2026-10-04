import {useEffect, useState} from "react";
import type {AuthState} from "../auth.types.ts";

const initialAuthState = {
    github: null,
    leetcode: null
}

export function useAuthState() {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);
    const [authLoading, setAuthLoading] = useState(true);

    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        async function loadAuthState(): Promise<void> {
            try {
                setAuthLoading(true);
                setAuthError(null);

                const response = await chrome.runtime.sendMessage({
                    type: "LOAD_AUTH_STATE"
                })

                if (!response.ok) {
                    setAuthError(response.error);
                    return;
                }

                setAuthState(response.data);
            }
            catch (error) {
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load auth state"
                );
            }
            finally {
                setAuthLoading(false);
            }
        }

        void loadAuthState();
    }, [])


    async function githubLogin() {
        try {
            setAuthError(null);

            const response = await chrome.runtime.sendMessage({
                type: "GITHUB_LOGIN"
            })

            if (!response.ok) {
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

    async function leetcodeLogin() {
        try {
            setAuthError(null);

            const response = await chrome.runtime.sendMessage({
                type: "LEETCODE_LOGIN",
            })

            if (!response.ok) {
                setAuthError(response.error)
            }

            setAuthState(prev => ({
                ...prev,
                leetcode: response.data
            }));
        }
        catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Failed to login with LeetCode account"
            )
        }
    }

    async function logout() {
        try {
            setAuthLoading(true);
            setAuthError(null);

            const response = await chrome.runtime.sendMessage({
                type: "LOGOUT"
            })

            if (!response.ok) {
                setAuthError(response.error);
                return;
            }

            setAuthState(initialAuthState);
        }
        catch (error) {
            setAuthError(
                error instanceof Error
                    ? error.message
                    : "Failed to logout"
            )
        }
        finally {
            setAuthLoading(false);
        }
    }

    return {
        authState,
        authLoading,
        authError,
        githubLogin,
        leetcodeLogin,
        logout
    }
}