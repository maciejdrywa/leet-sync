import {useContext} from "react";
import {AuthContext} from "./AuthContext.ts";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth state must be inside AuthProvider')
    }

    return context;
}