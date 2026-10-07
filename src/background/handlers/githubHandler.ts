import type {BackgroundRequest, BackgroundResponse} from "../../shared/messaging/message.types.ts";
import {fetchGithubRepositories} from "../../features/repositories/repositories.service.ts";


export async function githubHandler(request: BackgroundRequest): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "FETCH_GITHUB_REPOSITORIES": {
            const repositories = await fetchGithubRepositories();

            return {
                ok: true,
                data: repositories,
            }
        }
        default: {
            throw new Error(`Unsupported auth request: ${request.type}`);
        }
    }
}