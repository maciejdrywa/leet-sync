import {Button} from "@/shared/components/ui/button.tsx";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import IconRepository from "@/shared/components/icons/IconRepository.tsx";
import DifficultyCounter from "@/popup/components/DifficultyCounter.tsx";
import {useLeetStats} from "@/features/leetcodeStats/hooks/useLeetStats.ts";

export function Dashboard() {
    const { selectedRepository } = useRepositories();
    const { leetCodeStats } = useLeetStats();

    const allLeetCodesSolved = leetCodeStats
        ? leetCodeStats.easyCount + leetCodeStats.mediumCount + leetCodeStats.hardCount
        : 0;

    return (
        <div className={"flex flex-col items-start p-4 gap-4"}>
            {/*LeetCode progress*/}
            <div className={"flex flex-col p-4 items-start bg-app-surface w-full rounded-lg border border-app-border"}>
                <div className={"flex items-center justify-between"}>
                    <h2 className={"text-app-text text-sm font-semibold"}>LeetCode Progress</h2>
                </div>
                <div className={"flex items-end justify-between pt-4 w-full"}>
                    <div className={"flex flex-col items-start shrink-0"}>
                        <div className={"flex flex-col flex-start"}>
                            <p className={"text-app-text text-3xl font-bold"}>{allLeetCodesSolved}</p>
                        </div>
                        <div className={"flex flex-col items-start pt-1 "}>
                            <p className={"text-app-muted text-xs font-semibold"}>Total Saved</p>
                        </div>
                    </div>
                    <div className={"flex items-start gap-4"}>
                        <DifficultyCounter label={"easy"} value={leetCodeStats?.easyCount ?? 0} color={"green"} />
                        <DifficultyCounter label={"med"} value={leetCodeStats?.mediumCount ?? 0} color={"yellow"} />
                        <DifficultyCounter label={"hard"} value={leetCodeStats?.hardCount ?? 0} color={"red"} />
                    </div>
                </div>
            </div>
            {/*Target repository*/}
            <div className={"flex flex-col w-full items-start gap-1.5"}>
                <div className={"flex w-full items-center justify-between px-1"}>
                    <p className={"text-app-muted text-xs font-bold uppercase"}>target repository</p>
                    {/*<ChangeRepositoryDialog  onSubmit={repositories.onSelect}/>*/}
                </div>
                <div className={"flex flex-col w-full items-start bg-app-surface border border-app-border rounded-lg p-4 gap-1"}>
                    <div className={"flex w-full items-center gap-3"}>
                        <IconRepository size={18} />
                        <p className={"min-w-0 flex-1 truncate text-sm font-normal"}>{selectedRepository?.fullName}</p>
                    </div>
                </div>
            </div>
            {/*Recent sync*/}
            <div className={"flex flex-col items-start gap-1.5 w-full"}>
                <div className={"flex items-center justify-between px-1 w-full"}>
                    <div className={"flex flex-col items-start"}>
                        <p className={"text-app-muted text-xs font-bold uppercase"}>recent sync</p>
                    </div>
                    <Button
                        variant={"link"}
                        size={"xs"}
                        className={"text-app-muted text-center font-normal text-xs"}
                    >
                        View All
                    </Button>
                </div>
                <div className={"flex flex-col w-full items-start bg-app-surface border border-app-border rounded-lg p-4 gap-1"}>
                    <div className={"flex items-center justify-between w-full"}>
                        <div className={"flex flex-col items-start"}>
                            <p className={"text-app-text text-base font-semibold"}>Two Sum.py</p>
                        </div>
                        <p className={"text-app-muted text-xs font-normal"}>2 min ago</p>
                    </div>
                    <div className={"flex flex-col items-start"}>
                        <p className={"text-app-muted text-start text-xs font-normal"}>Committed to main branch</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
