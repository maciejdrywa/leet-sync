type DifficultyCounterProps = {
    label: string;
    value: number;
    color: "green" | "yellow" | "red";
};

const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
};

export default function DifficultyCounter({label, value, color}: DifficultyCounterProps) {
    return (
        <div className={"flex flex-col items-center"}>
            <p className={"text-app-text text-base font-bold text-center"}>{value}</p>
            <div className={"flex pt-0.5 items-center gap-1"}>
                <span className={`w-1.5 h-1.5 rounded-full ${colorClasses[color]}`}/>
                <p className={"text-app-muted text-xs font-semibold uppercase"}>{label}</p>
            </div>
        </div>
    )
}