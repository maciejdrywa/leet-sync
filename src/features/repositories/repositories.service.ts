import {getValidGithubSession} from "../auth/github/githubSession.service.ts";
import {githubApiRequest} from "../../infrastructure/github/githubApi.client.ts";
import type {GithubRepository} from "./repositories.types.ts";

type GithubRepositoryResponse = {
    id: number;
    name: string;
    full_name: string;
    owner: {id: number};
};

export async function fetchGithubRepositories(): Promise<GithubRepository[]> {
    const session = await getValidGithubSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const response = await githubApiRequest<GithubRepositoryResponse[]>("/user/repos", session.accessToken);

    if (!response) {
        throw new Error("Failed to fetch Github Repositories");
    }

    return response.filter(repo => repo.owner.id === session.user.id)
        .map(repo => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
        }))
}
