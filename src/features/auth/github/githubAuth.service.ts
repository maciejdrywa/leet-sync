import {generateCodeChallenge, generateCodeVerifier} from "../utils/pkce.utils.ts";
import {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} from "../../../shared/constants/constants.ts";
import {getGithubUser} from "./githubUser.service.ts";
import type {GithubSession, GithubTokenResponse} from "./githubAuth.types.ts";
import {saveGithubSession} from "./githubSesion.storage.ts";
import {buildGithubSession} from "./githubSession.service.ts";


export async function startGithubLogin(): Promise<GithubSession> {
    const codeVerifier = await generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const state = crypto.randomUUID();

    const redirectUri = chrome.identity.getRedirectURL();

    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", "user repo");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");
    authUrl.searchParams.set("prompt", "select_account");

    const responseUrl = await chrome.identity.launchWebAuthFlow({
        url: authUrl.toString(),
        interactive: true,
    })

    if (!responseUrl) {
        throw new Error("Response url doesn't exist");
    }

    const redirectUrl = new URL(responseUrl);
    const code = redirectUrl.searchParams.get("code");
    const responseState = redirectUrl.searchParams.get("state");

    if (!code) {
        throw new Error("Code doesn't exist");
    }

    if (responseState !== state) {
        throw new Error("Response state doesn't match with original state");
    }

    // Exchange code for GitHub token data
    const tokenData = await exchangeCodeForTokenData(code, codeVerifier);
    const userData = await getGithubUser(tokenData.accessToken);

    const githubSession = buildGithubSession(tokenData, userData);

    await saveGithubSession(githubSession);

    return githubSession;
}

async function exchangeCodeForTokenData(code: string, verifier: string): Promise<GithubTokenResponse> {
    const tokenUrl = new URL("https://github.com/login/oauth/access_token");


    const response = await fetch(tokenUrl.toString(), {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: new URLSearchParams({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code,
            code_verifier: verifier,
        })
    })

    if (!response.ok) {
        throw new Error("Failed to exchange code for the access token");
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

