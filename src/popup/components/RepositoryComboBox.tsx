import type {GithubRepository} from "@/features/repositories/repositories.types.ts";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput, ComboboxItem,
    ComboboxList
} from "@/shared/components/ui/combobox.tsx";

type RepositoryComboBoxProps = {
    repositories: GithubRepository[];
    value: string;
    onValueChange: (repository: GithubRepository) => void;
}

export default function RepositoryComboBox({repositories, value, onValueChange}: RepositoryComboBoxProps) {
    function handleOnValueChange(value: string | null) {
        const repository = repositories.find((repo) => repo.fullName === value)

        if (!repository) return;

        console.log(repository);
        onValueChange(repository);
    }

    return (
        <Combobox
            items={repositories}
            value={value}
            onValueChange={handleOnValueChange}
        >
            <ComboboxInput
                className="w-full bg-app-surface h-10"
                placeholder="Select a repository"
            />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.id} value={item.fullName}>
                            {item.fullName}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}