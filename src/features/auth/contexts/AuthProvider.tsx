import type {ReactNode} from "react";
import {useAuthState} from "../hooks/useAuthState.ts";
import { AuthContext } from "./AuthContext.ts";

export function AuthProvider({children}: {children: ReactNode}) {
    const {
        authState,
        authLoading,
        authError,
        githubLogin,
        leetcodeLogin,
        logout
    } = useAuthState();

    return (
        <AuthContext.Provider value={{
            authState,
            loading: authLoading,
            error: authError,
            githubLogin,
            leetcodeLogin,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}