import {useContext} from "react";
import {RepositoriesContext} from "./RepositoriesContext.ts";

export function useRepositories() {
    const context = useContext(RepositoriesContext);

    if (!context) {
        throw new Error("useRepositories must be inside RepositoriesProvider")
    }

    return context;
}