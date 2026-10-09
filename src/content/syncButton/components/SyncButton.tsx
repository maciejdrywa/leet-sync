import {Button} from "@/shared/components/ui/button.tsx";
import {Upload} from "lucide-react";

export default function SyncButton() {

    function handleClick() {
        console.log("Sync button clicked");
    }

    return (
        <Button
            onClick={handleClick}
            className="bg-leetcode/10 border-leetcode text-leetcode transition-all duration-200 hover:bg-leetcode/20 hover:shadow-sm"
        >
            <Upload />
            Sync with GitHub
        </Button>
    )
}