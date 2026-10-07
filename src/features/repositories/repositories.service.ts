import {getValidGithubSession} from "../auth/github/githubSession.service.ts";
import {githubApiRequest} from "../../infrastructure/github/githubApi.client.ts";
import type {GithubRepository} from "./repositories.types.ts";


export async function fetchGithubRepositories(): Promise<GithubRepository[]> {
    const session = await getValidGithubSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const response = await githubApiRequest("/user/repos", session.accessToken);

    if (!response) {
        throw new Error("Failed to fetch Github Repositories");
    }

    return response.filter((repo: any) => repo.owner.id === session.user.id)
        .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
        }))
}