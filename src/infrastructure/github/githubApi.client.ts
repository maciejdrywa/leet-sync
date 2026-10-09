
const GITHUB_API_BASE_URL = "https://api.github.com"

export class GithubApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(`GitHub API error: ${status} ${message}`);
        this.name = "GithubApiError";
        this.status = status;
    }
}

export async function githubApiRequest<T>(url: string, token?: string, options?: RequestInit): Promise<T> {
    const requestUrl = `${GITHUB_API_BASE_URL}${url}`;
    const headers = new Headers(options?.headers);
    headers.set("Accept", "application/vnd.github+json");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(requestUrl, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let message = response.statusText;
        try {
            const error: unknown = await response.json();
            if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
                message = error.message;
            }
        } catch {
            // Fall back to the HTTP status when the response is not JSON.
        }
        throw new GithubApiError(response.status, message);
    }

    return response.json();
}
