import {useEffect, useState} from "react";
import type {LeetCodeStats, LeetCodeStatsCache} from "@/features/leetcodeStats/leetStats.types.ts";
import {LEETCODE_STATS_KEY} from "@/features/leetcodeStats/leetStats.storage.ts";
import type {BackgroundRequest, BackgroundResponse} from "@/shared/messaging/message.types.ts";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";

export function useLeetStats() {
    const [stats, setStats] = useState<LeetCodeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {authState} = useAuth();
    const username = authState.leetcode?.user.username;

    useEffect(() => {
        let active = true;
        let requestVersion = 0;

        function applyStats(stats: LeetCodeStats) {
            setStats(stats);
            setError(null);
            setLoading(false);
        }

        async function loadLeetCodeStats() {
            const version = ++requestVersion;

            try {
                setLoading(true);
                setError(null);

                const response: BackgroundResponse<LeetCodeStats> = await chrome.runtime.sendMessage({
                    type: "FETCH_LEETCODE_STATS",
                } satisfies BackgroundRequest);

                if (!response.ok) {
                    throw new Error(response.error);
                }

                if (active && version === requestVersion) {
                    applyStats(response.data);
                }
            }
            catch (error) {
                if (active && version === requestVersion) {
                    setError(error instanceof Error ? error.message : "Failed to load LeetCode stats");
                }
            }
            finally {
                if (active && version === requestVersion) {
                    setLoading(false);
                }
            }
        }

        function handleStorageChange(changes: Record<string, chrome.storage.StorageChange>, areaName: string) {
            if (!active || areaName !== "local" || !changes[LEETCODE_STATS_KEY]) return;

            const cached = changes[LEETCODE_STATS_KEY].newValue as LeetCodeStatsCache | undefined;

            if (cached?.stats && cached.username === username && cached.fetchedAt > 0) {
                // Ignore an older message response arriving after a background refresh.
                requestVersion++;
                applyStats(cached.stats);
            } else if (!cached) {
                requestVersion++;
                setStats(null);
                setError(null);
                setLoading(false);
            }
        }

        chrome.storage.onChanged.addListener(handleStorageChange);
        void loadLeetCodeStats();

        return () => {
            active = false;
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, [username]);


    return {
        leetCodeStats: stats,
        leetCodeStatsLoading: loading,
        leetCodeStatsError: error,
    }
}
