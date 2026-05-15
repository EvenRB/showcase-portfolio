/**
 * Build-time GitHub stats fetcher.
 * - Reads PUBLIC_GITHUB_TOKEN (or GITHUB_TOKEN) from env to lift rate limits.
 * - Returns null on failure — never crash the build.
 * - Caches per repo across the build via a module-level Map.
 */

export interface GitHubStats {
  stars: number;
  forks: number;
  language: string | null;
  languages: { name: string; pct: number; color: string }[];
  updatedAt: string;        // ISO
  updatedAtLabel: string;   // human "2d ago"
  commit: string;           // short sha
  url: string;
}

const cache = new Map<string, GitHubStats | null>();

const headers = () => {
  const t = import.meta.env.PUBLIC_GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN;
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'evenrbrekne-portfolio',
  };
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Astro: '#ff5d01',
  Svelte: '#ff3e00',     Rust: '#dea584',       Go: '#00ADD8',
  Python: '#3572A5',     Swift: '#F05138',      Solidity: '#AA6746',
  CSS: '#563d7c',        HTML: '#e34c26',       MDX: '#fcb32c',
  Shell: '#89e051',      SQL: '#e38c00',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30)   return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12)  return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

export async function getGitHubStats(repo: string): Promise<GitHubStats | null> {
  if (!repo) return null;
  if (cache.has(repo)) return cache.get(repo)!;

  try {
    const [repoRes, langRes, commitRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`,           { headers: headers() }),
      fetch(`https://api.github.com/repos/${repo}/languages`, { headers: headers() }),
      fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, { headers: headers() }),
    ]);
    if (!repoRes.ok) {
      cache.set(repo, null);
      return null;
    }
    const d = await repoRes.json();
    const langs = langRes.ok ? await langRes.json() : {};
    const commits = commitRes.ok ? await commitRes.json() : [];

    const total = Object.values(langs as Record<string, number>).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(langs as Record<string, number>)
      .map(([name, bytes]) => ({
        name,
        pct: Math.round((bytes / total) * 100),
        color: LANG_COLORS[name] ?? '#888',
      }))
      .filter(l => l.pct > 0)
      .sort((a, b) => b.pct - a.pct);

    const out: GitHubStats = {
      stars:     d.stargazers_count ?? 0,
      forks:     d.forks_count ?? 0,
      language:  d.language ?? null,
      languages,
      updatedAt: d.pushed_at ?? d.updated_at,
      updatedAtLabel: timeAgo(d.pushed_at ?? d.updated_at),
      commit:    (commits[0]?.sha ?? '———————').slice(0, 7),
      url:       d.html_url,
    };
    cache.set(repo, out);
    return out;
  } catch {
    cache.set(repo, null);
    return null;
  }
}
