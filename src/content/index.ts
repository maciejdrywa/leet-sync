import { observeSyncButton } from "./syncButton";
import {loadSavedAuthState} from "@/features/auth/auth.service.ts";
import {getSelectedRepository} from "@/features/repositories/repositories.storage.ts";

async function initializeContentScript() {
    const [authState, repository] = await Promise.all([
        loadSavedAuthState(),
        getSelectedRepository(),
    ]);

    if (!authState.github || !authState.leetcode || !repository) {
        return;
    }

    observeSyncButton();
}

void initializeContentScript().catch(console.error);