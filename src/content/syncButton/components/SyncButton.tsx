import {Button} from "@/shared/components/ui/button.tsx";
import {Check, LoaderCircle, Upload} from "lucide-react";
import {useEffect, useState} from "react";
import {motion, useReducedMotion} from "motion/react";
import type {BackgroundRequest, BackgroundResponse} from "@/shared/messaging/message.types.ts";
import type {EditorContent} from "@/features/sync/editor/editor.types.ts";

export default function SyncButton() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (status !== "success") return;

        const timer = window.setTimeout(() => setStatus("idle"), 2000);
        return () => window.clearTimeout(timer);
    }, [status]);

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
        if (status === "loading") return;

        setStatus("loading");
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

            setStatus("success");
        } catch (error) {
            setStatus("idle");
            console.error(error instanceof Error ? error.message : "Failed to sync with GitHub");
        }
    }

    return (
        <motion.div
            initial={false}
            animate={{scale: status === "success" && !shouldReduceMotion ? [1, 1.08, 1] : 1}}
            transition={{duration: 0.35}}
        >
            <Button
                onClick={handleClick}
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className={`min-w-40 transition-colors duration-200 hover:shadow-sm ${
                    status === "success"
                        ? "bg-green-500/10 border-green-500 text-green-500 hover:bg-green-500/20"
                        : "bg-leetcode/10 border-leetcode text-leetcode hover:bg-leetcode/20"
                }`}
            >
                {status === "loading" ? (
                    <LoaderCircle aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                ) : status === "success" ? (
                    <Check aria-hidden="true" />
                ) : (
                    <Upload aria-hidden="true" />
                )}
                <span aria-live="polite" aria-atomic="true">
                    {status === "loading" ? "Syncing..." : status === "success" ? "Synced!" : "Sync with GitHub"}
                </span>
            </Button>
        </motion.div>
    )
}
