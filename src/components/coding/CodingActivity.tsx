import { useEffect, useState } from 'react';
import { GITHUB_USER } from '@/data/codingProjects';
import { relativeTime } from '@/hooks/useRepoCommitGraph';
import { focusRing } from '@/components/coding/CodingHero';

type FeedItem = { id: string; repo: string; message: string; when: string; kind: string };

export const CodingActivity = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-activity')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { feed?: FeedItem[] }) => {
        if (!cancelled && Array.isArray(data.feed)) setFeed(data.feed.filter((f) => f.kind === 'commit').slice(0, 6));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="activity" className="py-20 md:py-28 border-t border-border scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Commit history</h2>
          <p className="font-body text-muted-foreground max-w-md md:justify-self-end">
            Public contributions over the last year, straight from GitHub.
          </p>
        </div>

        <div className="border border-border p-4 md:p-6 overflow-x-auto">
          <img
            src={`https://ghchart.rshah.org/235CB9/${GITHUB_USER}`}
            alt={`${GITHUB_USER} GitHub contribution chart for the last year`}
            className="min-w-[640px] w-full h-auto"
            loading="lazy"
          />
        </div>

        {feed.length >= 3 && (
          <>
            <h3 className="mt-14 mb-4 font-display text-2xl font-bold tracking-tight">Latest commits</h3>
            <ul className="border-t border-border">
              {feed.map((item) => (
                <li key={item.id} className="grid gap-1 md:grid-cols-[14rem_minmax(0,1fr)_8rem] md:gap-6 py-4 border-b border-border">
                  <p className="font-mono-meta normal-case tracking-normal text-[13px] text-primary truncate">{item.repo}</p>
                  <p className="font-body text-foreground break-words">{item.message}</p>
                  <p className="font-body text-sm text-muted-foreground md:text-right">{relativeTime(item.when)}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noreferrer"
          className={`mt-8 inline-block font-body text-foreground underline decoration-border underline-offset-4 hover:decoration-accent ${focusRing}`}
        >
          See everything on GitHub
        </a>
      </div>
    </section>
  );
};
