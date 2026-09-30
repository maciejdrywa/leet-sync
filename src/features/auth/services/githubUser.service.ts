import type {GithubUser} from "../auth.types.ts";

export async function getGithubUser(accessToken: string): Promise<GithubUser> {
    if (!accessToken) {
        throw new Error("Access token doesn't exist");
    }

    const response = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data")
    }

    const json = await response.json();

    return {
        id: json.id,
        name: json.login,
        email: json.email,
        avatarUrl: json.avatar_url,
    }
}