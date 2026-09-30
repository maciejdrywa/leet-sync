
export async function generateCodeVerifier(): Promise<string> {
    const bytes = new Uint8Array(64);
    crypto.getRandomValues(bytes);

    return encodeUrl64Base(bytes);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);

    const digest = await crypto.subtle.digest("SHA-256", data);

    return encodeUrl64Base(new Uint8Array(digest));
}

function encodeUrl64Base(bytes: Uint8Array): string {
    const binary = String.fromCharCode(...bytes);

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
