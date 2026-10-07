import type {ReactNode} from "react";
import Topbar from "@/popup/components/Topbar.tsx";

export default function PopupLayout({children}: {children: ReactNode}) {
    return (
        <div className="flex flex-col items-start w-90 bg-app-bg">
            <Topbar/>

            <div className="flex-1 w-full">
                {children}
            </div>
        </div>
    )
}
