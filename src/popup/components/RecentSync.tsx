import {Button} from "@/shared/components/ui/button.tsx";
import {useRecentSync} from "@/features/sync/hooks/useRecentSync.ts";
import type {GithubRepository} from "@/features/repositories/repositories.types.ts";

export default function RecentSync({repository}: {repository: GithubRepository}) {
    const {recentSync, recentSyncLoading, recentSyncError, reloadRecentSync} = useRecentSync(repository.fullName);
    const repositoryPath = repository.fullName.split("/").map(encodeURIComponent).join("/");
    const repositoryUrl = `https://github.com/${repositoryPath}`;
    const committedAt = recentSync?.committedAt ? new Date(recentSync.committedAt) : null;
    const hasCommitTime = committedAt !== null && !Number.isNaN(committedAt.getTime());

    return (
        <section className="flex flex-col items-start gap-1.5 w-full" aria-labelledby="recent-sync-heading">
            <div className="flex items-center justify-between px-1 w-full">
                <h2 id="recent-sync-heading" className="text-app-muted text-xs font-bold uppercase">Recent Sync</h2>
                <Button
                    variant="link"
                    size="xs"
                    className="text-app-muted text-center font-normal text-xs"
                    nativeButton={false}
                    render={<a href={repositoryUrl} target="_blank" rel="noopener noreferrer" />}
                >
                    View All
                </Button>
            </div>
            <div
                className="flex flex-col w-full items-start bg-app-surface border border-app-border rounded-lg p-4 gap-1"
                aria-live="polite"
                aria-busy={recentSyncLoading}
            >
                {recentSyncLoading ? (
                    <p className="text-app-muted text-xs">Loading recent sync...</p>
                ) : recentSyncError ? (
                    <>
                        <p role="alert" className="text-app-danger text-xs break-words w-full">{recentSyncError}</p>
                        <Button variant="link" size="xs" className="px-0" onClick={reloadRecentSync}>
                            Try again
                        </Button>
                    </>
                ) : recentSync ? (
                    <>
                        <a
                            href={`${repositoryUrl}/commit/${encodeURIComponent(recentSync.sha)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-0 flex-1 truncate text-app-text text-base font-semibold break-words line-clamp-2 w-full hover:underline"
                            title={recentSync.title}
                        >
                            {recentSync.title}
                        </a>
                        {hasCommitTime ? (
                            <time dateTime={committedAt.toISOString()} className="text-app-muted text-xs font-normal">
                                {committedAt.toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short"})}
                            </time>
                        ) : (
                            <p className="text-app-muted text-xs">Commit time unavailable</p>
                        )}
                    </>
                ) : (
                    <p className="text-app-muted text-xs">No commits yet. Sync your first solution to see it here.</p>
                )}
            </div>
        </section>
    );
}
