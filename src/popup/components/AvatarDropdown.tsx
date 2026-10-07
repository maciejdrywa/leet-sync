import {Button} from "@/shared/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {useAuth} from "@/features/auth/contexts/useAuth.ts";

export default function AvatarDropdown() {
    const { authState, logout } = useAuth()

    const user = authState.github?.user

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src={user?.avatarUrl} alt={user?.login} />
                            <AvatarFallback>
                                {user?.login?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                }
            />

            <DropdownMenuContent className="w-56">
                <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="size-9">
                        <AvatarImage src={user?.avatarUrl} alt={user?.login} />
                        <AvatarFallback>
                            {user?.login?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex min-w-0 flex-col">
                        {user?.name && (
                            <span className="truncate text-sm font-medium">
                                {user?.name}
                            </span>
                        )}

                        <span className="truncate text-xs text-muted-foreground">
                            @{user?.login}
                        </span>
                    </div>
                </div>

                <DropdownMenuSeparator />


                <DropdownMenuGroup>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={logout}
                    >
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
