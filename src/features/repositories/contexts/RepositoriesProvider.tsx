import type {ReactNode} from "react";
import {useGithubRepositories} from "../hooks/useGithubRepositories.ts";
import {RepositoriesContext} from "./RepositoriesContext.ts";
import {useSelectedRepository} from "../hooks/useSelectedRepository.ts";


export function RepositoriesProvider({ children }: { children: ReactNode }) {
    const {
        githubRepositories,
        githubRepositoriesLoading,
        githubRepositoriesError,
        getGithubRepositories,
    } = useGithubRepositories()

    const {
        selectedRepository,
        selectedRepositoryLoading,
        selectedRepositoryError,
        setSelectedRepository
    } = useSelectedRepository()

    return (
        <RepositoriesContext.Provider value={{
            githubRepositories,
            githubRepositoriesLoading,
            githubRepositoriesError,
            getGithubRepositories,

            selectedRepository,
            selectedRepositoryLoading,
            selectedRepositoryError,
            setSelectedRepository
        }}>
            {children}
        </RepositoriesContext.Provider>
    )

}