import {useLeetStats} from "@/features/leetcodeStats/hooks/useLeetStats.ts";
import {Skeleton} from "@/shared/components/ui/skeleton.tsx";
import DifficultyCounter from "@/popup/components/DifficultyCounter.tsx";

export default function LeetCodeStats() {
    const {leetCodeStats, leetCodeStatsLoading, leetCodeStatsError} = useLeetStats();
    const totalSolved = leetCodeStats
        ? leetCodeStats.easyCount + leetCodeStats.mediumCount + leetCodeStats.hardCount
        : 0;

    return (
        <section
            className="flex flex-col p-4 items-start bg-app-surface w-full rounded-lg border border-app-border"
            aria-labelledby="leetcode-stats-heading"
            aria-busy={leetCodeStatsLoading}
        >
            <h2 id="leetcode-stats-heading" className="text-app-text text-sm font-semibold">LeetCode Progress</h2>
            {leetCodeStatsLoading ? (
                <>
                    <span role="status" className="sr-only">Loading LeetCode stats...</span>
                    <div className="flex items-end justify-between pt-4 w-full" aria-hidden="true">
                        <div className="flex flex-col items-start shrink-0 gap-1">
                            <Skeleton className="h-9 w-16" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex items-start gap-4">
                            {["easy", "med", "hard"].map(difficulty => (
                                <div key={difficulty} className="flex flex-col items-center gap-0.5">
                                    <Skeleton className="h-6 w-8" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : leetCodeStatsError ? (
                <p role="alert" className="pt-4 text-app-danger text-xs break-words w-full">{leetCodeStatsError}</p>
            ) : (
                <div className="flex items-end justify-between pt-4 w-full">
                    <div className="flex flex-col items-start shrink-0 gap-1">
                        <p className="text-app-text text-3xl font-bold">{totalSolved}</p>
                        <p className="text-app-muted text-xs font-semibold">Total Saved</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <DifficultyCounter label="easy" value={leetCodeStats?.easyCount ?? 0} color="green" />
                        <DifficultyCounter label="med" value={leetCodeStats?.mediumCount ?? 0} color="yellow" />
                        <DifficultyCounter label="hard" value={leetCodeStats?.hardCount ?? 0} color="red" />
                    </div>
                </div>
            )}
        </section>
    );
}
