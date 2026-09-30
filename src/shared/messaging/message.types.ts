export type BackgroundRequest =
    {
        type: "GITHUB_LOGIN"
    };


export type BackgroundResponse<T> =
    {
        ok: true,
        data: T,
    } |
    {
        ok: false;
        error: string;
    }