import type {LeetCodeSession} from "./leetcodeAuth.types.ts";
import {saveLeetCodeSession} from "./leetcodeSession.storage.ts";
import {getUserStatus} from "./leetcodeUser.service.ts";
const LEETCODE_LOGIN_URL = "https://leetcode.com/accounts/login/";
const LEETCODE_COOKIE_NAME = "LEETCODE_SESSION";
const LEETCODE_URL = "https://leetcode.com/";

export async function startLeetCodeLogin(): Promise<LeetCodeSession> {
    const authTab = await chrome.tabs.create({
        url: LEETCODE_LOGIN_URL,
    })

    if (!authTab.id) {
        throw new Error("Failed to open LeetCode login page");
    }

    try {
        const leetcodeCookie = await waitForLeetCodeSession(authTab.id);


        const dataUser = await getUserStatus(leetcodeCookie.value);

        const testSession = {
            sessionToken: leetcodeCookie.value,
            refreshedAt: Date.now(),

            user: {
                id: dataUser.id,
                username: dataUser.username,
            }
        };

        await saveLeetCodeSession(testSession);

        return testSession;
    }
    finally {
        await chrome.tabs.remove(authTab.id).catch(() => {});
    }
}

async function waitForLeetCodeSession(tabId: number): Promise<chrome.cookies.Cookie> {
    return new Promise((resolve, reject) => {
            const cookieListener = async (changedInfo: chrome.cookies.CookieChangeInfo) => {
                if (changedInfo.cookie.name === LEETCODE_COOKIE_NAME
                    && changedInfo.cookie.domain.includes("leetcode.com")
                    && !changedInfo.removed
                ) {
                    const leetcodeCookie = await chrome.cookies.get({
                        name: LEETCODE_COOKIE_NAME,
                        url: LEETCODE_URL,
                    })

                    cleanUp();

                    if (!leetcodeCookie) {
                        reject(new Error("Failed to open leetcode session"));
                        return;
                    }

                    resolve(leetcodeCookie);
                }
            }

            const tabListener = (closedTabId: number) => {
                if (closedTabId === tabId) {
                    cleanUp();
                    return reject(new Error(`LeetCode login cancelled`));
                }
            }

            const cleanUp = () => {
                chrome.cookies.onChanged.removeListener(cookieListener);
                chrome.tabs.onRemoved.removeListener(tabListener);
            }

            chrome.cookies.onChanged.addListener(cookieListener);
            chrome.tabs.onRemoved.addListener(tabListener);
        }
    )
}