import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import IconRepository from "@/shared/components/icons/IconRepository.tsx";
import LeetCodeStats from "@/popup/components/LeetCodeStats.tsx";
import RecentSync from "@/popup/components/RecentSync.tsx";

export function Dashboard() {
    const { selectedRepository } = useRepositories();

    return (
        <div className={"flex flex-col items-start p-4 gap-4"}>
            {/*LeetCode progress*/}
            <LeetCodeStats />
            {/*Target repository*/}
            <div className={"flex flex-col w-full items-start gap-1.5"}>
                <div className={"flex w-full items-center justify-between px-1"}>
                    <p className={"text-app-muted text-xs font-bold uppercase"}>target repository</p>
                </div>
                <div className={"flex flex-col w-full items-start bg-app-surface border border-app-border rounded-lg p-4 gap-1"}>
                    <div className={"flex w-full items-center gap-3"}>
                        <IconRepository size={18} />
                        <p className={"min-w-0 flex-1 truncate text-sm font-normal"}>{selectedRepository?.fullName}</p>
                    </div>
                </div>
            </div>
            {/*Recent sync*/}
            {selectedRepository && <RecentSync repository={selectedRepository} />}
        </div>
    )
}
