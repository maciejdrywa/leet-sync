import type {BackgroundRequest, BackgroundResponse} from "../../shared/messaging/message.types.ts";
import {startGithubLogin} from "../../features/auth/github/githubAuth.service.ts";
import {loadSavedAuthState, logoutAll} from "../../features/auth/auth.service.ts";
import {startLeetCodeLogin} from "../../features/auth/leetcode/leetcodeAuth.service.ts";


export async function authHandler(request: BackgroundRequest): Promise<BackgroundResponse<unknown>> {
    switch (request.type) {
        case "LOAD_AUTH_STATE": {
            const authState = await loadSavedAuthState();

            return {
                ok: true,
                data: authState
            }
        }
        case "GITHUB_LOGIN": {
            const session = await startGithubLogin()

            return {
                ok: true,
                data: session
            }
        }
        case "LEETCODE_LOGIN": {
            const session = await startLeetCodeLogin();

            return {
                ok: true,
                data: session
            }
        }
        case "LOGOUT": {
            await logoutAll();

            return {
                ok: true,
                data: null
            }
        }
        default: {
            throw new Error(`Unsupported auth request: ${request.type}`);
        }
    }
}