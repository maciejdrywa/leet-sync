import type {BackgroundRequest, BackgroundResponse} from "../../shared/messaging/message.types.ts";
import {startGithubLogin} from "../../features/auth/services/githubAuth.service.ts";

export async function authHandler(request: BackgroundRequest): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "GITHUB_LOGIN": {
            const session = await startGithubLogin()

            return {
                ok: true,
                data: session
            }
        }
    }
}