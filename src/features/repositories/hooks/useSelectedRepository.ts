import {useEffect, useState} from "react";
import type {GithubRepository} from "../repositories.types.ts";
import {getSelectedRepository, removeSelectedRepository, saveSelectedRepository} from "../repositories.storage.ts";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";


export function useSelectedRepository() {
    const [repository, setRepository] = useState<GithubRepository | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { authState, authLoading} = useAuth();

    useEffect(() => {
        async function loadSelectedRepository() {
            try {
                setLoading(true);
                setError(null);

                const repository = await getSelectedRepository();

                setRepository(repository);
            }
            catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load selected repository"
                )
            }
            finally {
                setLoading(false);
            }
        }
        void loadSelectedRepository()
    }, [])

    useEffect(() => {
        if (authState.github || authLoading) {
            return;
        }

        async function deleteSelectedRepositoryData() {
            try {
                setLoading(true);
                setError(null);

                await removeSelectedRepository();
                setRepository(null);
            }
            catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to delete selected repository data"
                );
            }
            finally {
                setLoading(false);
            }
        }

        void deleteSelectedRepositoryData();
    }, [authState.github, authLoading]);

    async function setSelectedRepository(repository: GithubRepository) {
        try {
            setLoading(true);
            setError(null);

            await saveSelectedRepository(repository);

            setRepository(repository);
        }
        catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to set selected repository"
            );
        }
        finally {
            setLoading(false);
        }
    }

    return {
        selectedRepository: repository,
        selectedRepositoryLoading: loading,
        selectedRepositoryError: error,
        setSelectedRepository
    }
}