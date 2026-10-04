export type LeetCodeSession = {
    sessionToken: string;
    refreshedAt: number;

    user: LeetCodeUser
}

export type LeetCodeUser = {
    id: number;
    username: string;
}