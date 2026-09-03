import { useRepoCommitGraph, relativeTime, type WeekBucket } from '@/hooks/useRepoCommitGraph';

function Sparkline({ buckets, height = 36 }: { buckets: WeekBucket[]; height?: number }) {
  const max = Math.max(1, ...buckets.map((b) => b.count));
  const w = buckets.length * 4;
  const points = buckets
    .map((b, i) => {
      const x = i * 4 + 1.5;
      const y = height - (b.count / max) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      className="w-full h-9"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
        opacity={0.9}
      />
      {buckets.map((b, i) => {
        if (b.count === 0) return null;
        const x = i * 4 + 1.5;
        const y = height - (b.count / max) * (height - 4) - 2;
        return (
          <circle
            key={b.weekStart}
            cx={x}
            cy={y}
            r="1.4"
            fill="hsl(var(--accent))"
          />
        );
      })}
    </svg>
  );
}

export const CommitSparkline = ({
  repo,
  weeks = 26,
}: {
  repo: string;
  weeks?: number;
}) => {
  const { buckets, loading, error, lastPush, total } = useRepoCommitGraph(repo, weeks);

  if (error) {
    return (
      <p className="font-mono text-[10px] text-muted-foreground">
        Graph unavailable
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
          Commits · {weeks}w
        </p>
        <p className="font-mono text-[10px] text-primary">
          {loading ? '…' : `${total}+ recent`}
          {!loading && lastPush ? ` · pushed ${relativeTime(lastPush)}` : ''}
        </p>
      </div>
      <div className="rounded-sm border border-border bg-secondary/40 px-2 py-1.5">
        {loading ? (
          <div className="h-9 animate-pulse bg-muted/40 rounded-sm" />
        ) : (
          <Sparkline buckets={buckets} />
        )}
      </div>
    </div>
  );
};
