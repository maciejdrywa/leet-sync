import type {BackgroundRequest, BackgroundResponse} from "@/shared/messaging/message.types.ts";
import {fetchLeetStats} from "@/features/leetcodeStats/leetStats.service.ts";

export async function leetcodeHandler(request: BackgroundRequest): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "FETCH_LEETCODE_STATS":{
            const stats = await fetchLeetStats();

            return {
                ok: true,
                data: stats
            }
        }
        default: {
            throw new Error(`Unsupported leetcode request: ${request.type}`);
        }
    }
}