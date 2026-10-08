import type {BackgroundRequest, BackgroundResponse} from "../shared/messaging/message.types.ts";
import {authHandler} from "./handlers/authHandler.ts";
import {githubHandler} from "./handlers/githubHandler.ts";
import {leetcodeHandler} from "@/background/handlers/leetcodeHandler.ts";


chrome.runtime.onInstalled.addListener(() => {
    console.log("leet-sync bg-worker was installed");
})


chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {

    handleRequest(request)
        .then(sendResponse)
        .catch(error => {
            sendResponse({
                ok: false,
                error: error instanceof Error ? error.message : "Request error",
            });
        });

    return true;
})


async function handleRequest(request: BackgroundRequest): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "LOAD_AUTH_STATE":
        case "GITHUB_LOGIN":
        case "LEETCODE_LOGIN":
        case "LOGOUT":
            return await authHandler(request);
        case "FETCH_GITHUB_REPOSITORIES":
            return await githubHandler(request);
        case "FETCH_LEETCODE_STATS":
            return await leetcodeHandler(request);
    }
}