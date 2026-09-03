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

/** Flatten GitHub events into readable commit/activity rows */
function toFeed(events: GhEvent[], limit = 10): FeedItem[] {
  const out: FeedItem[] = [];

  for (const e of events) {
    if (out.length >= limit) break;
    const repo = e.repo.name.replace(`${GITHUB_USER}/`, '');
    const actor = e.actor?.display_login || e.actor?.login;

    if (e.type === 'PushEvent' && e.payload?.commits?.length) {
      for (const c of e.payload.commits) {
        if (out.length >= limit) break;
        const msg = c.message ? firstLine(c.message) : 'Commit';
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

    if (e.type === 'PullRequestEvent') {
      const title = e.payload?.pull_request?.title || 'Pull request';
      const prUser = e.payload?.pull_request?.user?.login;
      out.push({
        id: e.id,
        repo,
        message: `${e.payload?.action ?? 'updated'} PR: ${title}`,
        people: uniquePeople([prUser, actor]),
        when: e.created_at,
        kind: 'pr',
      });
      continue;
    }

    if (e.type === 'IssuesEvent') {
      const title = e.payload?.issue?.title || 'Issue';
      out.push({
        id: e.id,
        repo,
        message: `${e.payload?.action ?? 'updated'} issue: ${title}`,
        people: uniquePeople([e.payload?.issue?.user?.login, actor]),
        when: e.created_at,
        kind: 'issue',
      });
      continue;
    }

    if (e.type === 'CreateEvent') {
      out.push({
        id: e.id,
        repo,
        message: `Created ${e.payload?.ref_type ?? 'ref'}${e.payload?.ref ? ` “${e.payload.ref}”` : ''}`,
        people: uniquePeople([actor]),
        when: e.created_at,
        kind: 'create',
      });
      continue;
    }

    if (e.type === 'WatchEvent') {
      out.push({
        id: e.id,
        repo,
        message: `Starred ${repo}`,
        people: uniquePeople([actor]),
        when: e.created_at,
        kind: 'star',
      });
      continue;
    }

    if (e.type === 'ForkEvent') {
      out.push({
        id: e.id,
        repo,
        message: `Forked → ${e.payload?.forkee?.full_name ?? repo}`,
        people: uniquePeople([actor]),
        when: e.created_at,
        kind: 'fork',
      });
    }
  }

  return out.slice(0, limit);
}

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
  const feed = useMemo(() => toFeed(rawEvents, 10), [rawEvents]);
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
              Recent events
            </p>
            <ul className="space-y-4">
              {loading && feed.length === 0 && (
                <li className="font-mono text-xs text-muted-foreground">Loading activity…</li>
              )}
              {!loading && feed.length === 0 && (
                <li className="font-mono text-xs text-muted-foreground">No public events found.</li>
              )}
              {feed.map((item) => (
                <li key={item.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="font-mono text-[9px] tracking-wider uppercase text-primary mb-1">
                    {item.repo}
                    {item.kind === 'commit' ? ' · commit' : ''}
                  </p>
                  <p className="font-body text-sm text-foreground leading-snug break-words">
                    {item.message}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    {item.people.length > 0 && (
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {item.people.length > 1 ? 'with ' : 'by '}
                        {item.people.join(', ')}
                      </p>
                    )}
                    <p className="font-mono text-[10px] text-muted-foreground/70">
                      {relativeTime(item.when)}
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
