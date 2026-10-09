export type EditorContent = {
    code: string;
    language: string;
    extension: string;
}

export type MonacoModel = {
    uri: {
        toString(): string;
    };
    getValue(): string;
    getLanguageId(): string;
};


export const LEETCODE_LANGUAGE_EXTENSIONS: Record<string, string> = {
    // Programming languages
    c: ".c",
    cpp: ".cpp",
    csharp: ".cs",
    java: ".java",
    python: ".py",
    python3: ".py",
    javascript: ".js",
    typescript: ".ts",
    go: ".go",
    golang: ".go",
    rust: ".rs",
    kotlin: ".kt",
    swift: ".swift",
    ruby: ".rb",
    php: ".php",
    scala: ".scala",
    dart: ".dart",
    racket: ".rkt",
    erlang: ".erl",
    elixir: ".ex",
    bash: ".sh",
    shell: ".sh",

    // Database languages
    sql: ".sql",
    mysql: ".sql",
    mssql: ".sql",
    oraclesql: ".sql",
    postgresql: ".sql",

    // Other environments
    pythondata: ".py",
    react: ".jsx",
    vanillajs: ".js",
};
