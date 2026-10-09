import {Button} from "@/shared/components/ui/button.tsx";
import {Upload} from "lucide-react";
import type {BackgroundResponse} from "@/shared/messaging/message.types.ts";
import type {EditorContent} from "@/features/sync/editor/editor.types.ts";

export default function SyncButton() {

    async function handleClick() {
        try {
            const response = await chrome.runtime.sendMessage<
                {type: "GET_LEETCODE_EDITOR_DATA"},
                BackgroundResponse<EditorContent>
            >({type: "GET_LEETCODE_EDITOR_DATA"});

            if (!response.ok) {
                throw new Error(response.error);
            }

            console.log(response.data);
        } catch (error) {
            console.error(error instanceof Error ? error.message : "Failed to read editor");
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
