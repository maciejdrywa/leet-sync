import {createContext} from "react";
import type {AuthState} from "../auth.types.ts";


type AuthContextType = {
    authState: AuthState;
    loading: boolean;
    error: string | null;

    githubLogin: () => void;
    leetcodeLogin: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


