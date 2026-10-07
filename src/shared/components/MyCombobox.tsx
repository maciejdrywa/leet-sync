import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput, ComboboxItem,
    ComboboxList
} from "@/shared/components/ui/combobox.tsx";
import type {GithubRepository} from "@/features/repositories/repositories.types.ts";

type MyComboboxProps= {
    repositories: GithubRepository[],
    value: string,
    onValueChange: (repository: GithubRepository) => void,
}

export default function MyCombobox({repositories, value, onValueChange}: MyComboboxProps) {
    function handleValueChanged(newValue: string | null) {
        const repository = repositories.find(
            (repo) => repo.name === newValue
        );

        if (!repository) {
            return;
        }

        onValueChange(repository);
    }

    return (
        <Combobox
            items={repositories}
            value={value}
            onValueChange={handleValueChanged}
        >
            <ComboboxInput placeholder="Select repository" />

            <ComboboxContent>
                <ComboboxEmpty>No repositories found</ComboboxEmpty>

                <ComboboxList>
                    {(item) => (
                        <ComboboxItem
                            key={item.id}
                            value={item.name}
                        >
                            {item.name}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}