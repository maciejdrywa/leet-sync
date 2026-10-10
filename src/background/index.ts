import type {BackgroundRequest, BackgroundResponse} from "../shared/messaging/message.types.ts";
import {authHandler} from "./handlers/authHandler.ts";
import {githubHandler} from "./handlers/githubHandler.ts";
import {leetcodeHandler} from "@/background/handlers/leetcodeHandler.ts";
import {removeLeetCodeSession, saveLeetCodeSession} from "@/features/auth/leetcode/leetcodeSession.storage.ts";
import {getUserStatus} from "@/features/auth/leetcode/leetcodeUser.service.ts";


chrome.runtime.onInstalled.addListener(() => {
    console.log("leet-sync bg-worker was installed");
})


let leetcodeSessionUpdate: Promise<void> = Promise.resolve();

chrome.cookies.onChanged.addListener(({cookie, removed, cause}) => {
    const domain = cookie.domain.replace(/^\./, "");

    if (cookie.name !== "LEETCODE_SESSION" || domain !== "leetcode.com") {
        return;
    }

    if (removed && cause === "overwrite") {
        return;
    }

    leetcodeSessionUpdate = leetcodeSessionUpdate
        .then(async () => {
            if (removed || !cookie.value) {
                await removeLeetCodeSession();
                return;
            }

            const user = await getUserStatus(cookie.value);

            await saveLeetCodeSession({
                sessionToken: cookie.value,
                refreshedAt: Date.now(),
                user,
            });
        })
        .catch(error => {
            console.error(
                "Failed to update LeetCode session:",
                error instanceof Error ? error.message : "Unknown error",
            );
        });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    handleRequest(request, sender)
        .then(sendResponse)
        .catch(error => {
            sendResponse({
                ok: false,
                error: error instanceof Error ? error.message : "Request error",
            });
        });

    return true;
})

async function handleRequest(request: BackgroundRequest, sender: chrome.runtime.MessageSender): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "LOAD_AUTH_STATE":
        case "GITHUB_LOGIN":
        case "LEETCODE_LOGIN":
        case "LOGOUT":
            return await authHandler(request);
        case "FETCH_GITHUB_REPOSITORIES":
        case "SYNC_WITH_GITHUB":
            return await githubHandler(request);
        case "FETCH_LEETCODE_STATS":
        case "GET_LEETCODE_EDITOR_DATA":
            return await leetcodeHandler(request, sender);
    }
}
