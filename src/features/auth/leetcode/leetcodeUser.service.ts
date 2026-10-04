import type {LeetCodeUser} from "./leetcodeAuth.types.ts";
import {createLeetcodeGraphqlClient} from "../../../infrastructure/leetcode/leetcodeApi.client.ts";

export async function getUserStatus(sessionToken: string): Promise<LeetCodeUser> {
    if (!sessionToken) {
        throw new Error("User is not authenticated");
    }

    const query = `
        query globalData {
            userStatus {
                userId
                username
            }
        }
    `

    const response = await createLeetcodeGraphqlClient(sessionToken).request(query);

    return {
        id: response.userStatus.userId,
        username: response.userStatus.username,
    }
}