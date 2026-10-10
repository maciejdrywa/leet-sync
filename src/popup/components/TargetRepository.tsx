import IconRepository from "@/shared/components/icons/IconRepository.tsx";
import type {GithubRepository} from "@/features/repositories/repositories.types.ts";

export default function TargetRepository({repository}: {repository: GithubRepository | null}) {
    return (
        <div className="flex flex-col w-full items-start gap-1.5">
            <div className="flex w-full items-center justify-between px-1">
                <p className="text-app-muted text-xs font-bold uppercase">target repository</p>
            </div>
            <div className="flex flex-col w-full items-start bg-app-surface border border-app-border rounded-lg p-4 gap-1">
                <div className="flex w-full items-center gap-3">
                    <IconRepository size={18} />
                    <p className="min-w-0 flex-1 truncate text-sm font-normal">{repository?.fullName}</p>
                </div>
            </div>
        </div>
    );
}
