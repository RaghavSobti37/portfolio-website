import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GITHUB_USER } from '@/data/codingProjects';
import { relativeTime } from '@/hooks/useRepoCommitGraph';

interface GhCommit {
  sha?: string;
  message?: string;
  author?: { name?: string; email?: string };
}

interface GhEvent {
  id: string;
  type: string;
  actor?: { login?: string; display_login?: string; avatar_url?: string };
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: GhCommit[];
    ref_type?: string;
    size?: number;
    action?: string;
    pull_request?: { title?: string; user?: { login?: string } };
    issue?: { title?: string; user?: { login?: string } };
    forkee?: { full_name?: string };
    ref?: string;
  };
}

type DayPoint = { day: string; label: string; count: number };

type FeedItem = {
  id: string;
  repo: string;
  message: string;
  people: string[];
  when: string;
  kind: string;
};

function buildDailySeries(events: GhEvent[], days = 28): DayPoint[] {
  const map = new Map<string, number>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, 0);
  }

  for (const e of events) {
    const key = e.created_at.slice(0, 10);
    if (!map.has(key)) continue;
    const bump =
      e.type === 'PushEvent'
        ? Math.max(1, e.payload?.commits?.length ?? e.payload?.size ?? 1)
        : 1;
    map.set(key, (map.get(key) ?? 0) + bump);
  }

  return [...map.entries()].map(([day, count]) => ({
    day,
    label: new Date(day + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    count,
  }));
}

function firstLine(msg: string) {
  return msg.split('\n')[0]?.trim() || msg.trim();
}

function uniquePeople(names: Array<string | undefined>) {
  return [...new Set(names.map((n) => n?.trim()).filter(Boolean) as string[])];
}

/** Prefer real commits / PRs — skip stars, branch creates, forks (noise) */
function toFeed(events: GhEvent[], limit = 10): FeedItem[] {
  const out: FeedItem[] = [];
  const ownPrefix = `${GITHUB_USER}/`;

  for (const e of events) {
    if (out.length >= limit) break;
    const full = e.repo.name;
    const repo = full.startsWith(ownPrefix) ? full.slice(ownPrefix.length) : full;
    const actor = e.actor?.display_login || e.actor?.login;
    const isOwn = full.startsWith(ownPrefix) || full.toLowerCase().startsWith(ownPrefix.toLowerCase());

    if (e.type === 'PushEvent' && e.payload?.commits?.length) {
      // Prefer pushes to own repos
      if (!isOwn && out.length > 2) continue;
      for (const c of e.payload.commits) {
        if (out.length >= limit) break;
        const msg = c.message ? firstLine(c.message) : '';
        if (!msg || msg.length < 3) continue;
        // skip merge noise / empty bots
        if (/^Merge (branch|pull request)/i.test(msg)) continue;
        out.push({
          id: `${e.id}-${c.sha ?? out.length}`,
          repo,
          message: msg,
          people: uniquePeople([c.author?.name, actor]),
          when: e.created_at,
          kind: 'commit',
        });
      }
      continue;
    }

    if (e.type === 'PullRequestEvent' && e.payload?.action === 'closed') {
      const title = e.payload?.pull_request?.title;
      if (!title) continue;
      out.push({
        id: e.id,
        repo,
        message: `Merged: ${title}`,
        people: uniquePeople([e.payload?.pull_request?.user?.login, actor]),
        when: e.created_at,
        kind: 'pr',
      });
    }
  }

  return out.slice(0, limit);
}

/** Curated shipping log when public events are thin / noisy */
const SHIPPED: FeedItem[] = [
  {
    id: 'ship-coreknot',
    repo: 'Coreknot',
    message: 'CoreKnot — productivity product shipping on Vercel',
    people: ['Raghav'],
    when: '2025-08-01T12:00:00Z',
    kind: 'ship',
  },
  {
    id: 'ship-tsc',
    repo: 'TSC-Website',
    message: 'The Shakti Collective — academy & storytelling platform',
    people: ['Raghav'],
    when: '2025-07-15T12:00:00Z',
    kind: 'ship',
  },
  {
    id: 'ship-portfolio',
    repo: 'portfolio-website',
    message: 'BluePolaroid — cinema × code portfolio live',
    people: ['Raghav'],
    when: '2025-09-01T12:00:00Z',
    kind: 'ship',
  },
  {
    id: 'ship-balaji',
    repo: 'balaji-infra',
    message: 'Balaji Infra — corporate site for heavy civil',
    people: ['Raghav'],
    when: '2025-06-01T12:00:00Z',
    kind: 'ship',
  },
  {
    id: 'ship-mailer',
    repo: 'Auto-Mailer',
    message: 'Auto Mailer — outreach sequences that run themselves',
    people: ['Raghav'],
    when: '2025-05-01T12:00:00Z',
    kind: 'ship',
  },
];

export const CodingActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [rawEvents, setRawEvents] = useState<GhEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: GhEvent[]) => {
        if (cancelled) return;
        setRawEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setRawEvents([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const series = useMemo(() => buildDailySeries(rawEvents, 28), [rawEvents]);
  const liveFeed = useMemo(() => toFeed(rawEvents, 8), [rawEvents]);
  const feed = liveFeed.length >= 3 ? liveFeed : SHIPPED;
  const hasActivity = series.some((d) => d.count > 0);

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

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-6 md:gap-10 items-start">
          <div className="space-y-6 md:space-y-8 min-w-0">
            <div className="border border-border p-3 sm:p-4 md:p-6 bg-secondary/20 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                  Contribution graph · last year
                </p>
                <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground/80 sm:hidden">
                  swipe →
                </p>
              </div>
              <div className="overflow-x-auto -mx-1 px-1 overscroll-x-contain touch-pan-x [scrollbar-width:thin]">
                <img
                  src={`https://ghchart.rshah.org/235CB9/${GITHUB_USER}`}
                  alt={`${GITHUB_USER} GitHub contribution chart`}
                  className="h-[88px] sm:h-[110px] md:h-auto w-auto min-w-[640px] md:min-w-[520px] md:w-full max-w-none opacity-90"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="border border-border p-3 sm:p-4 md:p-6 bg-secondary/20 min-w-0">
              <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mb-4">
                Activity graph · last 28 days
              </p>
              <div className="h-[180px] sm:h-[220px] w-full">
                {loading ? (
                  <p className="font-mono text-xs text-muted-foreground pt-16 text-center">
                    Loading activity…
                  </p>
                ) : !hasActivity ? (
                  <p className="font-mono text-xs text-muted-foreground pt-16 text-center">
                    No recent public events to chart.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                      <defs>
                        <linearGradient id="bpActivityFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#235CB9" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#235CB9" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="hsl(240 4% 18%)" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: 'hsl(240 5% 55%)', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                        minTickGap={28}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fill: 'hsl(240 5% 55%)', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        width={28}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(240 6% 8%)',
                          border: '1px solid hsl(240 4% 18%)',
                          borderRadius: 0,
                          fontSize: 12,
                        }}
                        labelStyle={{ color: 'hsl(40 20% 92%)' }}
                        itemStyle={{ color: '#F35F0E' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Events"
                        stroke="#F35F0E"
                        strokeWidth={2}
                        fill="url(#bpActivityFill)"
                        dot={false}
                        activeDot={{ r: 3, fill: '#F35F0E' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          <div className="border border-border p-5 md:p-6 bg-card/30 min-w-0">
            <p className="font-mono text-[10px] tracking-wider uppercase text-accent mb-5">
              {liveFeed.length >= 3 ? 'Latest commits' : 'Shipped lately'}
            </p>
            <ul className="space-y-4">
              {loading && liveFeed.length === 0 && (
                <li className="font-mono text-xs text-muted-foreground">Loading activity…</li>
              )}
              {feed.map((item) => (
                <li key={item.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="font-mono text-[9px] tracking-wider uppercase text-primary mb-1">
                    {item.repo}
                    {item.kind === 'commit' ? ' · commit' : item.kind === 'ship' ? ' · build' : ''}
                  </p>
                  <p className="font-body text-sm text-foreground leading-snug break-words">
                    {item.message}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    {item.people.length > 0 && item.kind !== 'ship' && (
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {item.people.length > 1 ? 'with ' : 'by '}
                        {item.people.join(', ')}
                      </p>
                    )}
                    <p className="font-mono text-[10px] text-muted-foreground/70">
                      {item.kind === 'ship' ? item.when.slice(0, 7) : relativeTime(item.when)}
                    </p>
                  </div>
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
