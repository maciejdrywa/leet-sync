import {useCallback, useEffect, useState} from "react";
import type {GithubRepository} from "../repositories.types.ts";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";

export function useGithubRepositories() {
    const [repositories, setRepositories] = useState<GithubRepository[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    const { authState, authLoading } = useAuth();

    useEffect(() => {
        if (authState.github || authLoading) {
            return;
        }

        function clearGithubRepositories() {
            setRepositories([]);
            setError(null);
        }

        void clearGithubRepositories();
    }, [authState.github, authLoading]);

    const getGithubRepositories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const repositories = await chrome.runtime.sendMessage({
                type: "FETCH_GITHUB_REPOSITORIES",
            })

            if (!repositories.ok) {
                setError(repositories.error);
                return;
            }

            setRepositories(repositories.data);
        }
        catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load GitHub repositories"
            );
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        githubRepositories: repositories,
        githubRepositoriesLoading: loading,
        githubRepositoriesError: error,
        getGithubRepositories
    }
}
