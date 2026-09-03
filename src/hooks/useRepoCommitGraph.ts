import { useEffect, useMemo, useState } from 'react';
import { GITHUB_USER } from '@/data/codingProjects';

export type WeekBucket = { weekStart: number; count: number };

function startOfWeek(ts: number) {
  const d = new Date(ts);
  const day = d.getUTCDay();
  d.setUTCDate(d.getUTCDate() - day);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

/** Build last N weeks of commit counts from commit dates */
export function bucketCommits(dates: string[], weeks = 26): WeekBucket[] {
  const now = Date.now();
  const buckets: WeekBucket[] = [];
  const thisWeek = startOfWeek(now);

  for (let i = weeks - 1; i >= 0; i--) {
    buckets.push({ weekStart: thisWeek - i * 7 * 24 * 60 * 60 * 1000, count: 0 });
  }

  for (const iso of dates) {
    const t = new Date(iso).getTime();
    const w = startOfWeek(t);
    const idx = buckets.findIndex((b) => b.weekStart === w);
    if (idx >= 0) buckets[idx].count += 1;
  }

  return buckets;
}

export function useRepoCommitGraph(repo: string, weeks = 26) {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastPush, setLastPush] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo}/commits?per_page=100`,
          {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }
        );
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const data = (await res.json()) as Array<{
          commit: { author: { date: string } };
        }>;
        if (cancelled) return;
        const ds = data.map((c) => c.commit.author.date);
        setDates(ds);
        setLastPush(ds[0] ?? null);
      } catch (e) {
        if (!cancelled && !(e instanceof DOMException && e.name === 'AbortError')) {
          setError(e instanceof Error ? e.message : 'Failed');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [repo]);

  const buckets = useMemo(() => bucketCommits(dates, weeks), [dates, weeks]);

  return { buckets, loading, error, lastPush, total: dates.length };
}

export function relativeTime(iso: string | null): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
