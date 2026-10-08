import type {LeetCodeStats} from "@/features/leetcodeStats/leetStats.types.ts";
import {getLeetCodeSession} from "@/features/auth/leetcode/leetcodeSession.storage.ts";
import {createLeetcodeGraphqlClient} from "@/infrastructure/leetcode/leetcodeApi.client.ts";

type LeetStatsResponse = {
    userProfileUserQuestionProgressV2: {
        numAcceptedQuestions: {
            count: number;
            difficulty: string;
        }[];
    } | null;
};

export async function fetchLeetStats(): Promise<LeetCodeStats> {
    const session = await getLeetCodeSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

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
        .request<LeetStatsResponse>(query, variables);

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
