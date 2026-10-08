import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import {useEffect} from "react";
import {removeLeetCodeStats} from "@/features/leetcodeStats/leetStats.storage.ts";

export default function useLeetStatsCleanup() {
    const { authState, authLoading } = useAuth();

    useEffect(() => {
        if (authState.leetcode || authLoading) return;

        async function clearStats() {
            try {
                await removeLeetCodeStats();
            }
            catch (error) {
                console.error("Failed to remove LeetCode stats data", error);
            }
        }

        void clearStats();
    }, [authState, authLoading]);
}