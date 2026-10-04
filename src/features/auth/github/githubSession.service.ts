import type {GithubSession, GithubTokenResponse, GithubUser} from "./githubAuth.types.ts";


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