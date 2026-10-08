import {createContext} from "react";
import type {GithubRepository} from "../repositories.types.ts";

type RepositoriesContextType = {
    githubRepositories: GithubRepository[];
    githubRepositoriesLoading: boolean;
    githubRepositoriesError: string | null;
    getGithubRepositories: () => Promise<void>;

    selectedRepository: GithubRepository | null;
    selectedRepositoryLoading: boolean;
    selectedRepositoryUpdating: boolean;
    selectedRepositoryError: string | null;
    setSelectedRepository: (selectedRepository: GithubRepository) => Promise<void>;
}

export const RepositoriesContext = createContext<RepositoriesContextType | null>(null);
