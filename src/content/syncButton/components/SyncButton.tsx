import {Button} from "@/shared/components/ui/button.tsx";
import {Upload} from "lucide-react";
import type {BackgroundRequest, BackgroundResponse} from "@/shared/messaging/message.types.ts";
import type {EditorContent} from "@/features/sync/editor/editor.types.ts";

export default function SyncButton() {


    function getProblemTitle(): string {
        const slug = window.location.pathname.split("/")[2];

        if (!slug) {
            throw new Error("Problem slug not found");
        }

        const element = document.querySelector<HTMLAnchorElement>(
            `a[href="/problems/${slug}/"]`
        );

        if (!element) {
            throw new Error("Problem title not found");
        }

        return element.textContent?.trim() ?? "";
    }


    async function handleClick() {
        try {
            const response: BackgroundResponse<EditorContent> = await chrome.runtime.sendMessage({
                type: "GET_LEETCODE_EDITOR_DATA"
            } satisfies BackgroundRequest);

            if (!response.ok) {
                throw new Error(response.error);
            }

            const syncResponse: BackgroundResponse<null> = await chrome.runtime.sendMessage({
                type: "SYNC_WITH_GITHUB",
                data: {
                    content: response.data.code,
                    fileName: getProblemTitle(),
                    extension: response.data.extension
                }
            } satisfies BackgroundRequest);

            if (!syncResponse.ok) {
                throw new Error(syncResponse.error);
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : "Failed to sync with GitHub");
        }
    }

    return (
        <div>
            <Button
                onClick={handleClick}
                className="bg-leetcode/10 border-leetcode text-leetcode transition-all duration-200 hover:bg-leetcode/20 hover:shadow-sm"
            >
                <Upload />
                Sync with GitHub
            </Button>
        </div>
    )
}
