export type BackgroundRequest =
    {
       type: "LOAD_AUTH_STATE"
    } |
    {
        type: "GITHUB_LOGIN"
    } |
    {
       type: "LEETCODE_LOGIN"
    } |
    {
        type: "LOGOUT"
    } |
    {
        type: "FETCH_GITHUB_REPOSITORIES"
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