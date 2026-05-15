import { getCollection, type CollectionEntry } from 'astro:content';
import { getGitHubStats, type GitHubStats } from './github';

export type Project = CollectionEntry<'projects'> & { gh: GitHubStats | null };

const STATUS_ORDER: Record<string, number> = {
  WIP: 0, Soon: 1, Shipped: 2, 'One day': 3, RIP: 4,
};

/** Sort: WIP first, then Soon, then by date desc within group. */
export async function getAllProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  const enriched = await Promise.all(all.map(async (p) => ({
    ...p,
    gh: p.data.repo ? await getGitHubStats(p.data.repo) : null,
  })));
  return enriched.sort((a, b) => {
    const sa = STATUS_ORDER[a.data.status] ?? 9;
    const sb = STATUS_ORDER[b.data.status] ?? 9;
    if (sa !== sb) return sa - sb;
    return (b.data.dateRange ?? '').localeCompare(a.data.dateRange ?? '');
  });
}

/** Top 2 featured (in sort order). */
export async function getFeaturedIds(): Promise<string[]> {
  const all = await getAllProjects();
  return all.filter(p => p.data.featured).slice(0, 2).map(p => p.id);
}

/** Strip http(s) and trailing slash for display. */
export function hostOf(url?: string): string {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
