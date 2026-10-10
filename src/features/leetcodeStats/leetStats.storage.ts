import {storageGet, storageRemove, storageSet} from "@/infrastructure/storage/storage.client.ts";
import type {LeetCodeStats, LeetCodeStatsCache} from "@/features/leetcodeStats/leetStats.types.ts";

export const LEETCODE_STATS_KEY = "LEETSYNC_LEETCODE_STATS";

export async function saveLeetCodeStats(stats: LeetCodeStats, username: string): Promise<void> {
    await storageSet<LeetCodeStatsCache>(LEETCODE_STATS_KEY, {
        stats,
        username,
        fetchedAt: Date.now(),
    });
}

export async function getLeetCodeStats(): Promise<LeetCodeStatsCache | null> {
    const cached = await storageGet<LeetCodeStatsCache | LeetCodeStats>(LEETCODE_STATS_KEY);

    // Stats saved by older versions have no owner or timestamp and must be refreshed.
    if (!cached || !("stats" in cached) || !cached.username || !Number.isFinite(cached.fetchedAt)) {
        return null;
    }

    return cached;
}

export async function invalidateLeetCodeStats(): Promise<void> {
    const cached = await getLeetCodeStats();

    if (cached) {
        await storageSet<LeetCodeStatsCache>(LEETCODE_STATS_KEY, {...cached, fetchedAt: 0});
    }
}

export async function removeLeetCodeStats(): Promise<void> {
    await storageRemove(LEETCODE_STATS_KEY);
}
