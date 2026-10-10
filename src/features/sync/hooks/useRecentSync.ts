import {useEffect, useState} from "react";
import type {BackgroundRequest, BackgroundResponse} from "@/shared/messaging/message.types.ts";
import type {RecentSync} from "../recentSync.types.ts";

type RecentSyncState = {
    repositoryFullName: string;
    attempt: number;
    data: RecentSync | null;
    error: string | null;
};

export function useRecentSync(repositoryFullName: string) {
    const [state, setState] = useState<RecentSyncState | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function loadRecentSync() {
            try {
                const response: BackgroundResponse<RecentSync | null> = await chrome.runtime.sendMessage({
                    type: "FETCH_RECENT_SYNC",
                    data: {repositoryFullName},
                } satisfies BackgroundRequest);

                if (!response.ok) {
                    throw new Error(response.error);
                }

                if (!cancelled) {
                    setState({repositoryFullName, attempt, data: response.data, error: null});
                }
            } catch (error) {
                if (!cancelled) {
                    setState({
                        repositoryFullName,
                        attempt,
                        data: null,
                        error: error instanceof Error ? error.message : "Failed to load recent sync",
                    });
                }
            }
        }

        void loadRecentSync();

        return () => {
            cancelled = true;
        };
    }, [repositoryFullName, attempt]);

    const currentState = state?.repositoryFullName === repositoryFullName && state.attempt === attempt
        ? state
        : null;

    return {
        recentSync: currentState?.data ?? null,
        recentSyncLoading: currentState === null,
        recentSyncError: currentState?.error ?? null,
        reloadRecentSync: () => setAttempt(previous => previous + 1),
    };
}
