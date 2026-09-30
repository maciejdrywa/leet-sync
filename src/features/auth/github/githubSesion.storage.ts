import {storageGet, storageRemove, storageSet} from "../../../infrastructure/storage/storage.client.ts";
import type {GithubSession} from "./githubAuth.types.ts";

const GITHUB_SESSION_STORAGE_KEY = "LEETSYNC_GITHUB_SESSION"

export async function saveGithubSession(value: GithubSession): Promise<void> {
    await storageSet<GithubSession>(GITHUB_SESSION_STORAGE_KEY, value)
}

export async function getGithubSession(): Promise<GithubSession | null> {
    return await storageGet<GithubSession>(GITHUB_SESSION_STORAGE_KEY);
}

export async function removeGithubSession(): Promise<void> {
    await storageRemove(GITHUB_SESSION_STORAGE_KEY);
}