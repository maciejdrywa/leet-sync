import type {ReactNode} from "react";
import {useAuthState} from "../hooks/useAuthState.ts";
import { AuthContext } from "./AuthContext.ts";

export function AuthProvider({children}: {children: ReactNode}) {
    const {
        authState,
        authLoading,
        authError,
        githubLogin,
        logout
    } = useAuthState();

    return (
        <AuthContext.Provider value={{
            authState,
            loading: authLoading,
            error: authError,
            githubLogin,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}