import type {GithubSession} from "./github/githubAuth.types.ts";

export type AuthState = {
    github: GithubSession | null
}