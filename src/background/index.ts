import type {BackgroundRequest} from "../shared/messaging/message.types.ts";
import {authHandler} from "./handlers/authHandler.ts";


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


async function handleRequest(request: BackgroundRequest) {
    switch (request.type) {
        case "GITHUB_LOGIN":
            return await authHandler(request);
    }
}