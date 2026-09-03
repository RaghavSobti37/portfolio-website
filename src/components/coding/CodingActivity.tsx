import { motion, useInView } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { GITHUB_USER } from '@/data/codingProjects';
import { relativeTime } from '@/hooks/useRepoCommitGraph';

interface GhEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: unknown[]; ref_type?: string };
}

export const CodingActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [events, setEvents] = useState<GhEvent[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=12`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: GhEvent[]) => setEvents(Array.isArray(data) ? data.slice(0, 8) : []))
      .catch(() => setEvents([]));
  }, []);

  const label = (e: GhEvent) => {
    const repo = e.repo.name.replace(`${GITHUB_USER}/`, '');
    if (e.type === 'PushEvent') return `pushed to ${repo}`;
    if (e.type === 'CreateEvent') return `created ${e.payload?.ref_type ?? 'ref'} on ${repo}`;
    if (e.type === 'WatchEvent') return `starred ${repo}`;
    if (e.type === 'ForkEvent') return `forked ${repo}`;
    if (e.type === 'IssuesEvent') return `issue activity on ${repo}`;
    if (e.type === 'PullRequestEvent') return `PR on ${repo}`;
    return `${e.type.replace('Event', '')} · ${repo}`;
  };

  return (
    <section id="activity" className="py-24 md:py-32 border-t border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className="font-mono-meta text-primary mb-3">GITHUB · SIGNAL</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Commit history
          </h2>
          <p className="font-body text-muted-foreground max-w-xl">
            Contribution calendar + recent public activity. Live from GitHub.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-10 items-start">
          <div className="space-y-8">
            {/* Contribution calendar */}
            <div className="border border-border p-4 md:p-6 bg-secondary/20 overflow-x-auto">
              <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-4">
                Contribution graph · last year
              </p>
              <img
                src={`https://ghchart.rshah.org/235CB9/${GITHUB_USER}`}
                alt={`${GITHUB_USER} GitHub contribution chart`}
                className="w-full min-w-[520px] h-auto opacity-90"
                loading="lazy"
              />
            </div>

            {/* Activity graph */}
            <div className="border border-border p-4 md:p-6 bg-secondary/20 overflow-hidden">
              <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-4">
                Activity graph · latest
              </p>
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&bg_color=0b0b0d&color=235cb9&line=f35f0e&point=f2f0eb&area=true&hide_border=true`}
                alt={`${GITHUB_USER} activity graph`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="border border-border p-5 md:p-6 bg-card/30">
            <p className="font-mono text-[10px] tracking-wider uppercase text-accent mb-5">
              Recent events
            </p>
            <ul className="space-y-4">
              {events.length === 0 && (
                <li className="font-mono text-xs text-muted-foreground">Loading activity…</li>
              )}
              {events.map((e) => (
                <li key={e.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="font-body text-sm text-foreground/90 leading-snug">{label(e)}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-1">
                    {relativeTime(e.created_at)}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 font-mono-meta text-primary hover:text-accent"
            >
              OPEN GITHUB ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
