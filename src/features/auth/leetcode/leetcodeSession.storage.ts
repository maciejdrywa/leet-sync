import {storageGet, storageRemove, storageSet} from "../../../infrastructure/storage/storage.client.ts";
import type {LeetCodeSession} from "./leetcodeAuth.types.ts";

const LEETCODE_SESSION_KEY = "LEETSYNC_LEETCODE_SESSION";

export async function saveLeetCodeSession(session: LeetCodeSession): Promise<void> {
    await storageSet<LeetCodeSession>(LEETCODE_SESSION_KEY, session);
}

export async function getLeetCodeSession(): Promise<LeetCodeSession | null> {
    return await storageGet<LeetCodeSession>(LEETCODE_SESSION_KEY);
}

export async function removeLeetCodeSession(): Promise<void> {
    await storageRemove(LEETCODE_SESSION_KEY);
}