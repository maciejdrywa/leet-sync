import {Spinner} from "@/shared/components/ui/spinner.tsx";


export default function LoadingScreen() {
    return (
        <div className={"flex items-center justify-center h-90"}>
            <Spinner className={"size-8"} />
        </div>
    )
}