export type LeetCodeStats = {
    easyCount: number;
    mediumCount: number;
    hardCount: number;
}

export type LeetCodeStatsCache = {
    stats: LeetCodeStats;
    username: string;
    fetchedAt: number;
};
