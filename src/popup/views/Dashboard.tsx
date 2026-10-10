import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import TargetRepository from "@/popup/components/TargetRepository.tsx";
import LeetCodeStats from "@/popup/components/LeetCodeStats.tsx";
import RecentSync from "@/popup/components/RecentSync.tsx";

export function Dashboard() {
    const { selectedRepository } = useRepositories();

    return (
        <div className={"flex flex-col items-start p-4 gap-4"}>
            {/*LeetCode progress*/}
            <LeetCodeStats />
            {/*Target repository*/}
            <TargetRepository repository={selectedRepository} />
            {/*Recent sync*/}
            {selectedRepository && <RecentSync repository={selectedRepository} />}
        </div>
    )
}
