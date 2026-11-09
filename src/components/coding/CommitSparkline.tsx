import { useRepoCommitGraph, relativeTime, type WeekBucket } from '@/hooks/useRepoCommitGraph';

function Bars({ buckets }: { buckets: WeekBucket[] }) {
  const max = Math.max(1, ...buckets.map((b) => b.count));
  return (
    <div className="flex items-end gap-px h-8 w-full" aria-hidden>
      {buckets.map((b) => {
        const h = b.count === 0 ? 2 : Math.max(3, Math.round((b.count / max) * 32));
        return (
          <div
            key={b.weekStart}
            className="flex-1 min-w-0 rounded-[1px] bg-primary/80"
            style={{ height: h, opacity: b.count === 0 ? 0.15 : 0.55 + (b.count / max) * 0.45 }}
            title={`${b.count} commits`}
          />
        );
      })}
    </div>
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

  if (error) return null;

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-baseline justify-between gap-3 font-body text-xs text-muted-foreground">
        <p>Commits, last {weeks} weeks</p>
        <p className="tabular-nums">
          {loading ? 'Loading' : `${total} commits`}
          {!loading && lastPush ? `, last push ${relativeTime(lastPush)}` : ''}
        </p>
      </div>
      {loading ? (
        <div className="h-8 motion-safe:animate-pulse bg-muted/30" />
      ) : (
        <Bars buckets={buckets} />
      )}
    </div>
  );
};
