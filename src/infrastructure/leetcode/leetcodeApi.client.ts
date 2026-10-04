import { GraphQLClient } from "graphql-request";

export function createLeetcodeGraphqlClient(sessionToken: string) {
    return new GraphQLClient("https://leetcode.com/graphql/", {
        headers: {
            Cookie: `LEETCODE_SESSION=${sessionToken}`,
        },
    });
}