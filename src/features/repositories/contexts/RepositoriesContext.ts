import {createContext} from "react";
import type {GithubRepository} from "../repositories.types.ts";

type RepositoriesContextType = {
    githubRepositories: GithubRepository[];
    githubRepositoriesLoading: boolean;
    githubRepositoriesError: string | null;
    getGithubRepositories: () => void;

    selectedRepository: GithubRepository | null;
    selectedRepositoryLoading: boolean;
    selectedRepositoryError: string | null;
    setSelectedRepository: (selectedRepository: GithubRepository) => void;
}

export const RepositoriesContext = createContext<RepositoriesContextType | null>(null);