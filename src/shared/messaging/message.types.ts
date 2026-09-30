export type BackgroundRequest =
    {
       type: "LOAD_AUTH_STATE"
    } |
    {
        type: "GITHUB_LOGIN"
    } |
    {
        type: "LOGOUT"
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