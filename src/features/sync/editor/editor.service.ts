import {type EditorContent, LEETCODE_LANGUAGE_EXTENSIONS, type MonacoModel} from "@/features/sync/editor/editor.types.ts";
import type {BackgroundResponse} from "@/shared/messaging/message.types.ts";

function readMonacoEditor(): BackgroundResponse<Omit<EditorContent, "extension">> {
    try {
        const page = window as Window & {
            monaco?: {
                editor: {
                    getModels(): MonacoModel[];
                };
            };
        };

        const monaco = page.monaco;

        if (!monaco?.editor) {
            throw new Error("Monaco is not available");
        }

        const model = monaco.editor.getModels().find(
            model => model.uri.toString() === "inmemory://model/1",
        );

        if (!model) {
            throw new Error("Editor model inmemory://model/1 was not found");
        }

        return {
            ok: true,
            data: {
                code: model.getValue(),
                language: model.getLanguageId(),
            },
        };
    } catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error.message : "Failed to read Monaco editor",
        };
    }
}

export async function getEditorContent(tabId: number): Promise<EditorContent> {
    const [injection] = await chrome.scripting.executeScript({
        target: {tabId},
        world: "MAIN",
        func: readMonacoEditor,
    });

    if (!injection?.result) {
        throw new Error("Nie udało się odczytać edytora");
    }

    if (!injection.result.ok) {
        throw new Error(injection.result.error);
    }

    const {code, language} = injection.result.data;
    const extension = LEETCODE_LANGUAGE_EXTENSIONS[language];

    if (typeof extension !== "string" || !extension) {
        throw new Error(`Unsupported editor language: ${language}`);
    }

    return {
        code,
        language,
        extension,
    };
}
