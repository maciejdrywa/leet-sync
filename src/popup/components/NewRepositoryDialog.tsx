import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/components/ui/dialog.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Field, FieldContent, FieldDescription, FieldGroup, FieldLabel} from "@/shared/components/ui/field.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {Switch} from "@/shared/components/ui/switch.tsx";
import {type SubmitEventHandler, useState} from "react";
import {useRepositories} from "@/features/repositories/contexts/useRepositories.ts";

export function NewRepositoryDialog() {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formName, setFormName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const {setSelectedRepository} = useRepositories();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!formName.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await chrome.runtime.sendMessage({
                type: "CREATE_GITHUB_REPOSITORY",
                data: {
                    name: formName.trim(),
                    isPublic: !isPrivate,
                }
            });

            if (!response.ok) {
                setError(response.error ?? "Failed to create repository");
                return;
            }

            await setSelectedRepository(response.data);
            setFormName("");
            setIsPrivate(false);
            setOpen(false);
        }
        catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create repository"
            );
        }
        finally {
            setIsSubmitting(false);
        }
    }


    return (
        <Dialog open={open} onOpenChange={(nextOpen) => {
            if (isSubmitting) return;
            setError(null);
            setOpen(nextOpen);
        }}>
            <DialogTrigger className="text-app-muted" render={<Button variant="link" size="sm" />}>
                Add new Repository
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <DialogHeader>
                        <DialogTitle>Create new Repository</DialogTitle>
                        <DialogDescription>This operation will create the new Repository on your GitHub account.</DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="repository-name">Repository name</FieldLabel>
                            <Input id="repository-name" type="text" value={formName} required disabled={isSubmitting} placeholder="Enter new repository name" onChange={(e) => setFormName(e.target.value)}/>
                        </Field>
                        <Field orientation="horizontal" className="max-w-sm">
                            <FieldContent>
                                <FieldLabel htmlFor="repository-private">Private repository</FieldLabel>
                                <FieldDescription>
                                    Turn this on if you want to make this repository private.
                                </FieldDescription>
                            </FieldContent>
                            <Switch id="repository-private" checked={isPrivate} onCheckedChange={setIsPrivate} disabled={isSubmitting}/>
                        </Field>

                    </FieldGroup>
                    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                    <DialogFooter className="flex-row">
                        <DialogClose render={<Button type="button" variant="outline" className="flex-1" disabled={isSubmitting} />}>
                            Cancel
                        </DialogClose>
                        <Button type="submit" className="flex-1" disabled={isSubmitting || !formName.trim()} aria-busy={isSubmitting}>
                            {isSubmitting ? "Creating…" : "Create repository"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
