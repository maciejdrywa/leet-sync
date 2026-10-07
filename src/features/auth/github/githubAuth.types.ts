export type GithubSession = {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    refreshTokenExpiresAt: number;
    scope: string;
    tokenType: string;

    user: GithubUser
}

export type GithubTokenResponse = {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
    scope: string;
    tokenType: string;
}

export type GithubUser = {
    id: number;
    login: string;
    name: string;
    email: string;
    avatarUrl: string
}