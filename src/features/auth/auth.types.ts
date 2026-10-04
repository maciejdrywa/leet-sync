import type {GithubSession} from "./github/githubAuth.types.ts";
import type {LeetCodeSession} from "./leetcode/leetcodeAuth.types.ts";

export type AuthState = {
    github: GithubSession | null
    leetcode: LeetCodeSession | null
}