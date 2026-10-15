import IconRepository from "@/shared/components/icons/IconRepository.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {ArrowRight} from "lucide-react";
import type {GithubRepository} from "@/features/repositories/repositories.types.ts";
import OnboardingLayout from "@/popup/layouts/OnboardingLayout.tsx";
import RepositoryComboBox from "@/popup/components/RepositoryComboBox.tsx";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";
import {Spinner} from "@/shared/components/ui/spinner.tsx";
import {NewRepositoryDialog} from "@/popup/components/NewRepositoryDialog.tsx";



export default function RepositoryStep() {
    const [selectedRepository, setSelectedRepository] = useState<GithubRepository>();

    const { githubRepositories,
        githubRepositoriesLoading,
        githubRepositoriesError,
        getGithubRepositories,
        selectedRepositoryError,
        selectedRepositoryUpdating,
        setSelectedRepository: saveSelectedRepository
    } = useRepositories();

    useEffect(() => {
        void getGithubRepositories();
    }, [getGithubRepositories]);

    const error = selectedRepositoryError ?? githubRepositoriesError;

    return (
        <OnboardingLayout
            icon={<IconRepository size={40}/>}
            iconShadowColor={"black"}
            title={"Select a Repository"}
            description={"Choose the GitHub repository where your accepted LeetCode solutions will be saved."}
            currentStep={4}
        >
            {/*Combobox section*/}
            <div className="w-full">
                <RepositoryComboBox
                    repositories={githubRepositories}
                    value={selectedRepository?.fullName ?? ""}
                    onValueChange={setSelectedRepository}
                />
                <div className="flex w-full justify-end items-center">
                    <NewRepositoryDialog />
                </div>
            </div>


            {/*Button section*/}
            <Button
                variant={"default"}
                size={"lg"}
                onClick={() => {
                    if (selectedRepository) {
                        void saveSelectedRepository(selectedRepository);
                    }
                }}
                className={"w-full h-13 rounded-2xl"}
                disabled={githubRepositoriesLoading || selectedRepositoryUpdating || !selectedRepository}
                aria-busy={selectedRepositoryUpdating}
            >
                Finish setup
                {selectedRepositoryUpdating ? <Spinner /> : <ArrowRight size={18} />}
            </Button>

            {error && (
                <p role="alert" className="px-4 pb-4 text-center text-sm text-app-danger">
                    {error}
                </p>
            )}
        </OnboardingLayout>
    )
}
