import {getValidGithubSession} from "@/features/auth/github/githubSession.service.ts";
import {GithubApiError, githubApiRequest} from "@/infrastructure/github/githubApi.client.ts";
import type {RecentSync} from "./recentSync.types.ts";

type GithubCommitResponse = {
    sha: string;
    commit: {
        message: string;
        committer: {date: string | null} | null;
    };
};

export async function fetchRecentSync(repositoryFullName: string): Promise<RecentSync | null> {
    const session = await getValidGithubSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const repositoryPath = repositoryFullName.split("/").map(encodeURIComponent).join("/");

    try {
        const [latestCommit] = await githubApiRequest<GithubCommitResponse[]>(
            `/repos/${repositoryPath}/commits?per_page=1`,
            session.accessToken,
        );

        if (!latestCommit) {
            return null;
        }

        return {
            sha: latestCommit.sha,
            title: latestCommit.commit.message.split(/\r?\n/, 1)[0].trim() || "Untitled commit",
            committedAt: latestCommit.commit.committer?.date ?? null,
        };
    } catch (error) {
        if (error instanceof GithubApiError
            && error.status === 409
            && error.message.toLowerCase().includes("repository is empty")) {
            return null;
        }

        throw error;
    }
}
