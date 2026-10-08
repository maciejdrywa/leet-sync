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
    } |
    {
        type: "FETCH_LEETCODE_STATS"
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