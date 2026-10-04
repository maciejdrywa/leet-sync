
const GITHUB_API_BASE_URL = "https://api.github.com"

export async function githubApiRequest<T>(url: string, token?: string, options?: RequestInit): Promise<T> {
    const requestUrl = `${GITHUB_API_BASE_URL}${url}`;

    const response = await fetch(requestUrl, {
        ...options,
        headers: {
            ...options?.headers,
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            Accept: "application/vnd.github+json",
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return await response.json() as Promise<T>;
}