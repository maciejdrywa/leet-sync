import type {BackgroundRequest, BackgroundResponse} from "@/shared/messaging/message.types.ts";
import {fetchLeetStats} from "@/features/leetcodeStats/leetStats.service.ts";
import {getEditorContent} from "@/features/sync/editor/editor.service.ts";

export async function leetcodeHandler(request: BackgroundRequest, sender: chrome.runtime.MessageSender): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "FETCH_LEETCODE_STATS":{
            const stats = await fetchLeetStats();

            return {
                ok: true,
                data: stats
            }
        }
        case "GET_LEETCODE_EDITOR_DATA": {
            const tabId = sender.tab?.id

            if (tabId === undefined) {
                throw new Error("Sender tab ID is missing");
            }

            const data = await getEditorContent(tabId)

            return {
                ok: true,
                data: data
            }
        }
        default: {
            throw new Error(`Unsupported leetcode request: ${request.type}`);
        }
    }
}