import { observeSyncButton } from "./syncButton";
import {getSelectedRepository} from "@/features/repositories/repositories.storage.ts";
import type {AuthState} from "@/features/auth/auth.types.ts";

async function getAuthStateHandler(): Promise<AuthState> {
    const response = await chrome.runtime.sendMessage({
        type: "LOAD_AUTH_STATE"
    })

    if (!response.ok) {
        throw new Error(response.error);
    }

    return response.data;
}

async function initializeContentScript() {
    const [authState, repository] = await Promise.all([
        getAuthStateHandler(),
        getSelectedRepository(),
    ]);

    if (!authState.github || !authState.leetcode || !repository) {
        return;
    }

    observeSyncButton();
}

void initializeContentScript().catch(console.error);
