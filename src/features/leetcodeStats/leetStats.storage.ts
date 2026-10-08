import {storageGet, storageRemove, storageSet} from "@/infrastructure/storage/storage.client.ts";
import type {LeetCodeStats} from "@/features/leetcodeStats/leetStats.types.ts";

const LEETCODE_STATS_KEY = "LEETSYNC_LEETCODE_STATS"

export async function saveLeetCodeStats(stats: LeetCodeStats): Promise<void> {
    await storageSet<LeetCodeStats>(LEETCODE_STATS_KEY, stats);
}

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
    return await storageGet<LeetCodeStats>(LEETCODE_STATS_KEY);
}

export async function removeLeetCodeStats(): Promise<void> {
    await storageRemove(LEETCODE_STATS_KEY);
}