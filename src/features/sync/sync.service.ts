import {getValidGithubSession} from "@/features/auth/github/githubSession.service.ts";
import {getSelectedRepository} from "@/features/repositories/repositories.storage.ts";


export async function syncWithGithub(): Promise<void> {
    const session = getValidGithubSession();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const selectedRepository = await getSelectedRepository();

    if (!selectedRepository) {
        throw new Error("No selected repository");
    }


}