import {useAuth} from "@/features/auth/contexts/useAuth.ts";
import AvatarDropdown from "@/popup/components/AvatarDropdown.tsx";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import IconLeetSync from "@/shared/components/icons/IconLeetSync";

export default function Topbar() {
    const { authState } = useAuth();
    const { selectedRepository } = useRepositories();

    const showAvatar = authState.github && authState.leetcode && selectedRepository;

    return (
        <div className={"flex p-4 justify-between items-center shrink-0 border-b border-app-border bg-app-surface w-full"}>
            <div className="flex items-center">
                <IconLeetSync size={32} />
                <h1 className={"text-app-text text-lg font-semibold"}>Leet<span className={"text-leetcode"}>Sync</span></h1>
            </div>
            {showAvatar
                ? <AvatarDropdown/>
                : null
            }
        </div>
    )
}