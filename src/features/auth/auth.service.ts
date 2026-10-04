import {removeGithubSession} from "./github/githubSesion.storage.ts";
import {getLeetCodeSession, removeLeetCodeSession} from "./leetcode/leetcodeSession.storage.ts";
import type {AuthState} from "./auth.types.ts";
import {getValidGithubSession} from "./github/githubSession.service.ts";

export async function logoutAll(): Promise<void> {
    await removeGithubSession();
    await removeLeetCodeSession();
}


export async function loadSavedAuthState(): Promise<AuthState> {
    const github = await getValidGithubSession();
    const leetcode = await getLeetCodeSession();

    return {
        github: github,
        leetcode: leetcode,
    }
}