import type {GithubRepository} from "./repositories.types.ts";
import {storageGet, storageRemove, storageSet} from "../../infrastructure/storage/storage.client.ts";

const GITHUB_SELECTED_REPOSITORY_KEY = "LEETSYNC_SELECTED_REPOSITORY";

export async function saveSelectedRepository(repository: GithubRepository): Promise<void>  {
    await storageSet<GithubRepository>(GITHUB_SELECTED_REPOSITORY_KEY, repository);
}

export async function getSelectedRepository(): Promise<GithubRepository | null> {
    return await storageGet<GithubRepository>(GITHUB_SELECTED_REPOSITORY_KEY);
}

export async function removeSelectedRepository(): Promise<void> {
    await storageRemove(GITHUB_SELECTED_REPOSITORY_KEY);
}