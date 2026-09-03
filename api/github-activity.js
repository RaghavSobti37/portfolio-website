const USER = 'RaghavSobti37';
const REPOS = [
  'portfolio-website',
  'Coreknot',
  'TSC-Website',
  'balaji-infra',
  'shrim-exports-website',
  'Auto-Mailer',
  'destiny-global',
  'House-Of-Kalla',
];

function ghHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'bluepolaroid-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function ghJson(url) {
  const res = await fetch(url, { headers: ghHeaders() });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false, status: res.status, data: null, text };
  }
  return { ok: true, status: res.status, data: await res.json(), text: '' };
}

function utcDayKey(isoOrDate) {
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  return d.toISOString().slice(0, 10);
}

function buildSeries(points, days = 28) {
  const map = new Map();
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    map.set(d.toISOString().slice(0, 10), 0);
  }
  for (const p of points) {
    const key = utcDayKey(p.at);
    if (!map.has(key)) continue;
    map.set(key, (map.get(key) ?? 0) + (p.count || 1));
  }
  return [...map.entries()].map(([day, count]) => ({
    day,
    label: new Date(day + 'T12:00:00Z').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    count,
  }));
}

function firstLine(msg) {
  return (msg || '').split('\n')[0]?.trim() || '';
}

function eventsToPoints(events) {
  const points = [];
  for (const e of events) {
    if (e.type === 'PushEvent') {
      const n = Math.max(1, e.payload?.commits?.length ?? e.payload?.size ?? 1);
      points.push({ at: e.created_at, count: n });
    } else {
      points.push({ at: e.created_at, count: 1 });
    }
  }
  return points;
}

function eventsToFeed(events, limit = 8) {
  const out = [];
  const prefix = `${USER}/`;
  for (const e of events) {
    if (out.length >= limit) break;
    const full = e.repo?.name || '';
    const repo = full.startsWith(prefix) ? full.slice(prefix.length) : full;
    const actor = e.actor?.display_login || e.actor?.login;

    if (e.type === 'PushEvent' && e.payload?.commits?.length) {
      for (const c of e.payload.commits) {
        if (out.length >= limit) break;
        const msg = firstLine(c.message);
        if (!msg || msg.length < 3) continue;
        if (/^Merge (branch|pull request)/i.test(msg)) continue;
        out.push({
          id: `${e.id}-${c.sha || out.length}`,
          repo,
          message: msg,
          people: [c.author?.name, actor].filter(Boolean),
          when: e.created_at,
          kind: 'commit',
        });
      }
      continue;
    }

    if (e.type === 'PullRequestEvent' && e.payload?.action === 'closed' && e.payload?.pull_request?.title) {
      out.push({
        id: e.id,
        repo,
        message: `Merged: ${e.payload.pull_request.title}`,
        people: [e.payload.pull_request.user?.login, actor].filter(Boolean),
        when: e.created_at,
        kind: 'pr',
      });
    }
  }
  return out;
}

async function commitsFallback(days = 28) {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const points = [];
  const feed = [];

  await Promise.all(
    REPOS.map(async (repo) => {
      const url = `https://api.github.com/repos/${USER}/${repo}/commits?since=${encodeURIComponent(since)}&per_page=40`;
      const { ok, data } = await ghJson(url);
      if (!ok || !Array.isArray(data)) return;
      for (const c of data) {
        const at = c.commit?.author?.date || c.commit?.committer?.date;
        if (!at) continue;
        points.push({ at, count: 1 });
        if (feed.length < 10) {
          const msg = firstLine(c.commit?.message);
          if (msg && msg.length >= 3 && !/^Merge (branch|pull request)/i.test(msg)) {
            feed.push({
              id: c.sha || `${repo}-${at}`,
              repo,
              message: msg,
              people: [c.commit?.author?.name].filter(Boolean),
              when: at,
              kind: 'commit',
            });
          }
        }
      }
    })
  );

  feed.sort((a, b) => new Date(b.when) - new Date(a.when));
  return { points, feed: feed.slice(0, 8) };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const eventsRes = await ghJson(
      `https://api.github.com/users/${USER}/events/public?per_page=100`
    );

    let source = 'events';
    let series;
    let feed;
    let eventCount = 0;

    if (eventsRes.ok && Array.isArray(eventsRes.data) && eventsRes.data.length > 0) {
      eventCount = eventsRes.data.length;
      series = buildSeries(eventsToPoints(eventsRes.data), 28);
      feed = eventsToFeed(eventsRes.data, 8);
    } else {
      source = 'commits';
      const fb = await commitsFallback(28);
      series = buildSeries(fb.points, 28);
      feed = fb.feed;
    }

    // If events worked but chart empty (window miss), blend commits
    if (source === 'events' && !series.some((d) => d.count > 0)) {
      const fb = await commitsFallback(28);
      if (fb.points.length) {
        source = 'events+commits';
        series = buildSeries([...eventsToPoints(eventsRes.data || []), ...fb.points], 28);
        if (feed.length < 3) feed = fb.feed;
      }
    }

    return res.status(200).json({
      ok: true,
      source,
      eventCount,
      series,
      feed,
      authenticated: Boolean(process.env.GITHUB_TOKEN || process.env.GH_TOKEN),
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      source: 'error',
      series: buildSeries([], 28),
      feed: [],
      error: err instanceof Error ? err.message : 'GitHub activity error',
    });
  }
}
