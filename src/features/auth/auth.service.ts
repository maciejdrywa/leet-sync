import {removeGithubSession} from "./github/githubSesion.storage.ts";

export async function logoutAll(): Promise<void> {
    await removeGithubSession()
}