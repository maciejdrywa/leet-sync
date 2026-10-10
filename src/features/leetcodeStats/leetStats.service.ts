import type {LeetCodeStats} from "@/features/leetcodeStats/leetStats.types.ts";
import {getLeetCodeSession} from "@/features/auth/leetcode/leetcodeSession.storage.ts";
import {createLeetcodeGraphqlClient} from "@/infrastructure/leetcode/leetcodeApi.client.ts";
import type {LeetCodeSession} from "@/features/auth/leetcode/leetcodeAuth.types.ts";
import {getLeetCodeStats, invalidateLeetCodeStats, saveLeetCodeStats} from "./leetStats.storage.ts";

export const LEETCODE_STATS_MAX_AGE_MS = 15 * 60 * 1000;

let statsQueue: Promise<void> = Promise.resolve();

type LeetStatsResponse = {
    userProfileUserQuestionProgressV2: {
        numAcceptedQuestions: {
            count: number;
            difficulty: string;
        }[];
    } | null;
};

export function getLeetStats(forceRefresh = false): Promise<LeetCodeStats> {
    // A refresh after syncing must run after any request started before that sync.
    const request = statsQueue.then(() => loadLeetStats(forceRefresh));
    statsQueue = request.then(() => {}, () => {});
    return request;
}

async function loadLeetStats(forceRefresh: boolean): Promise<LeetCodeStats> {
    const session = await getLeetCodeSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const cached = await getLeetCodeStats();
    const age = cached ? Date.now() - cached.fetchedAt : Infinity;

    if (!forceRefresh && cached?.username === session.user.username
        && cached.fetchedAt > 0 && age >= 0 && age < LEETCODE_STATS_MAX_AGE_MS) {
        return cached.stats;
    }

    if (forceRefresh) {
        // A failed refresh must be retried the next time the popup requests stats.
        await invalidateLeetCodeStats();
    }

    const stats = await fetchLeetStats(session);
    const currentSession = await getLeetCodeSession();

    if (currentSession?.user.username !== session.user.username) {
        throw new Error("LeetCode account changed while loading stats");
    }

    await saveLeetCodeStats(stats, session.user.username);
    return stats;
}

async function fetchLeetStats(session: LeetCodeSession): Promise<LeetCodeStats> {
    const query = `
    query userProfileUserQuestionProgressV2($userSlug: String!) {
      userProfileUserQuestionProgressV2(userSlug: $userSlug) {
        numAcceptedQuestions {
          count
          difficulty
        }
      }
    }
    `
    const variables = {
        userSlug: session.user.username
    }

    const response = await createLeetcodeGraphqlClient(session.sessionToken)
        .request<LeetStatsResponse>({
            document: query,
            variables,
            signal: AbortSignal.timeout(10_000),
        });

    const progress = response.userProfileUserQuestionProgressV2;

    if (!progress) {
        throw new Error("Failed to load LeetCode stats");
    }

    const counts = new Map(
        progress.numAcceptedQuestions.map(({difficulty, count}) => [difficulty.toUpperCase(), count])
    );

    return {
        easyCount: counts.get("EASY") ?? 0,
        mediumCount: counts.get("MEDIUM") ?? 0,
        hardCount: counts.get("HARD") ?? 0,
    };
}
