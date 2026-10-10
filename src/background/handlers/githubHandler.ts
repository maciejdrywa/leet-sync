import type {BackgroundRequest, BackgroundResponse} from "../../shared/messaging/message.types.ts";
import {fetchGithubRepositories} from "../../features/repositories/repositories.service.ts";
import {syncWithGithub} from "@/features/sync/sync.service.ts";
import {fetchRecentSync} from "@/features/sync/recentSync.service.ts";
import {getLeetStats} from "@/features/leetcodeStats/leetStats.service.ts";


export async function githubHandler(request: BackgroundRequest): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "FETCH_GITHUB_REPOSITORIES": {
            const repositories = await fetchGithubRepositories();

            return {
                ok: true,
                data: repositories,
            }
        }
        case "FETCH_RECENT_SYNC": {
            const recentSync = await fetchRecentSync(request.data.repositoryFullName);

            return {
                ok: true,
                data: recentSync,
            };
        }
        case "SYNC_WITH_GITHUB": {
            await syncWithGithub(request.data.content, request.data.fileName, request.data.extension);

            try {
                await getLeetStats(true);
            } catch (error) {
                console.error(
                    "Solution synced, but LeetCode stats could not be refreshed:",
                    error instanceof Error ? error.message : "Unknown error",
                );
            }

            return {
                ok: true,
                data: null
            }
        }
        default: {
            throw new Error(`Unsupported auth request: ${request.type}`);
        }
    }
}
