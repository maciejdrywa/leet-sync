import {createRoot} from "react-dom/client";
import SyncButton from "@/content/syncButton/components/SyncButton.tsx";
import styles from "@/index.css?inline"

function mountSyncButton() {
    const target = document.querySelector("#ide-top-btns");

    if (!target) return;

    if (document.getElementById("leetsync-sync-button")) return;

    const host = document.createElement("div");
    host.id = "leetsync-sync-button";

    target.appendChild(host);

    const shadowRoot = host.attachShadow({ mode: "open" });

    const style= document.createElement("style");
    style.textContent = styles.replaceAll(":root", ":host");

    shadowRoot.appendChild(style);

    const container = document.createElement("div");

    shadowRoot.appendChild(container);

    const root = createRoot(container);
    root.render(<SyncButton/>)
}


export function observeSyncButton() {
    mountSyncButton();

    const observer = new MutationObserver(() => mountSyncButton());
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return () => observer.disconnect();
}