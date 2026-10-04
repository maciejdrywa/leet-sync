import type {GithubSession, GithubTokenResponse, GithubUser} from "./githubAuth.types.ts";
import {getGithubSession, saveGithubSession} from "./githubSesion.storage.ts";
import {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} from "../../../shared/constants/constants.ts";
import {getGithubUser} from "./githubUser.service.ts";


export function buildGithubSession(tokenData: GithubTokenResponse, userData: GithubUser): GithubSession {
    const now = Date.now();

    return {
        accessToken: tokenData.accessToken,
        expiresAt: now + tokenData.expiresIn * 1000,
        refreshToken: tokenData.refreshToken,
        refreshTokenExpiresAt: now + tokenData.refreshTokenExpiresIn * 1000,
        scope: tokenData.scope,
        tokenType: tokenData.tokenType,

        user: userData
    }
}


export async function getValidGithubSession(): Promise<GithubSession | null> {
    const currentSession = await getGithubSession();

    if (!currentSession) {
        return null;
    }

    const now = Date.now();
    const expirationBuffer = 60_000;

    if (currentSession.accessToken && currentSession.expiresAt > now + expirationBuffer) {
        return currentSession;
    }

    if (currentSession.refreshToken && currentSession.refreshTokenExpiresAt > now + expirationBuffer) {
        return refreshAccessToken(currentSession.refreshToken);
    }

    return null
}


export async function refreshAccessToken(refreshToken: string): Promise<GithubSession> {
    const tokenData = await refreshRequest(refreshToken);
    const userData = await getGithubUser(tokenData.accessToken);

    const githubSession = buildGithubSession(tokenData, userData);

    await saveGithubSession(githubSession);

    return githubSession;
}

async function refreshRequest(refreshToken: string): Promise<GithubTokenResponse> {
    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: new URLSearchParams({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: refreshToken
        })
    });

    if (!response.ok) {
        throw new Error("Failed to refresh access token");
    }

    const json = await response.json();

    if (!json.access_token) {
        throw new Error("Access token doesn't exist")
    }

    return {
        accessToken: json.access_token,
        expiresIn: json.expires_in,
        refreshToken: json.refresh_token,
        refreshTokenExpiresIn: json.refresh_token_expires_in,
        scope: json.scope,
        tokenType: json.token_type,
    }
}
