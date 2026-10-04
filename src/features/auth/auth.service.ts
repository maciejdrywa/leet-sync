import {getGithubSession, removeGithubSession} from "./github/githubSesion.storage.ts";
import {getLeetCodeSession, removeLeetCodeSession} from "./leetcode/leetcodeSession.storage.ts";
import type {AuthState} from "./auth.types.ts";

export async function logoutAll(): Promise<void> {
    await removeGithubSession();
    await removeLeetCodeSession();
}


export async function loadSavedAuthState(): Promise<AuthState> {
    const github = await getGithubSession();
    const leetcode = await getLeetCodeSession();

    return {
        github: github,
        leetcode: leetcode,
    }
}