import type {GithubSession, GithubTokenResponse, GithubUser} from "./githubAuth.types.ts";
import type {AuthState} from "../auth.types.ts";
import {getGithubSession} from "./githubSesion.storage.ts";

export function buildGithubSession(tokenData: GithubTokenResponse, userData: GithubUser): GithubSession {
    return {
        accessToken: tokenData.accessToken,
        expiresAt: tokenData.expiresIn,
        refreshToken: tokenData.refreshToken,
        refreshTokenExpiresAt: tokenData.refreshTokenExpiresIn,
        scope: tokenData.scope,
        tokenType: tokenData.tokenType,

        user: userData
    }
}

export async function loadSavedAuthState(): Promise<AuthState> {
    const github = await getGithubSession();

    return {
        github: github
    }
}