import {useEffect, useState} from "react";
import type {LeetCodeStats} from "@/features/leetcodeStats/leetStats.types.ts";

export function useLeetStats() {
    const [stats, setStats] = useState<LeetCodeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadLeetCodeStats() {
            try {
                setLoading(true);
                setError(null);

                const response = await chrome.runtime.sendMessage({
                    type: "FETCH_LEETCODE_STATS",
                })

                if (!response.ok) {
                    setError(response.error);
                    return;
                }

                setStats(response.data);
            }
            catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load leetcode stats"
                )
            }
            finally {
                setLoading(false);
            }
        }

        void loadLeetCodeStats();
    }, [])

    return {
        leetCodeStats: stats,
        leetCodeStatsLoading: loading,
        leetCodeStatsError: error,
    }
}