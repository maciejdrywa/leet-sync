import {getValidGithubSession} from "@/features/auth/github/githubSession.service.ts";
import {getSelectedRepository} from "@/features/repositories/repositories.storage.ts";
import {GithubApiError, githubApiRequest} from "@/infrastructure/github/githubApi.client.ts";

type GithubFile = {
    type: string;
    sha: string;
};

async function getFileSha(accessToken: string, requestUrl: string): Promise<string | null> {
    try {
        const response = await githubApiRequest<GithubFile>(requestUrl, accessToken);

        if (response.type !== "file" || !response.sha) {
            throw new Error("GitHub path does not point to a regular file");
        }

        return response.sha;
    } catch (error) {
        if (error instanceof GithubApiError && error.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function syncWithGithub(content: string, fileName: string, extension: string): Promise<void> {
    const session = await getValidGithubSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const selectedRepository = await getSelectedRepository();

    if (!selectedRepository) {
        throw new Error("No selected repository");
    }

    const repositoryPath = selectedRepository.fullName.split("/").map(encodeURIComponent).join("/");
    const path = `${fileName}${extension}`.split("/").map(encodeURIComponent).join("/");
    const requestUrl = `/repos/${repositoryPath}/contents/${path}`;

    const sha = await getFileSha(session.accessToken, requestUrl);
    const bytes = new TextEncoder().encode(content);
    const encodedContent = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(""));
    const commitMessage = `New LeetCode question solved: ${fileName}`;

    await githubApiRequest(requestUrl, session.accessToken, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            message: commitMessage,
            content: encodedContent,
            ...(sha && {sha})
        })
    });
}
