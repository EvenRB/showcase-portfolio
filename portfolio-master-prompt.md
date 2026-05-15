# Portfolio Master Prompt
# Lim hele denne inn i Claude Code CLI etter `claude` i terminalen.
# ─────────────────────────────────────────────────────────────────

Du er en senior Astro-utvikler. Bygg et komplett porteføljenettsted fra scratch.
Gjør ALT nedenfor i riktig rekkefølge uten å stoppe og spørre underveis.
Rapporter kort etter hvert steg.

════════════════════════════════════════════════════════════════════
STEG 1 — OPPRETT PROSJEKTSTRUKTUR
════════════════════════════════════════════════════════════════════

Opprett følgende filer og mapper nøyaktig som spesifisert:

my-portfolio/
├── CLAUDE.md
├── .claude/
│   └── agents/
│       ├── schema-agent.md
│       ├── ui-agent.md
│       ├── sync-agent.md
│       └── github-stats-agent.md
├── .github/
│   └── workflows/
│       └── sync-obsidian.yml
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── projects/
│   │       └── example-project.md
│   ├── components/
│   │   ├── Layout.astro
│   │   ├── ProjectCard.astro
│   │   ├── FilterBar.astro
│   │   └── TableView.astro
│   ├── lib/
│   │   ├── github.ts
│   │   └── tagColors.ts
│   └── pages/
│       └── index.astro
├── public/
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json


════════════════════════════════════════════════════════════════════
STEG 2 — CLAUDE.md (prosjektinstruksjoner for fremtidige Claude-økter)
════════════════════════════════════════════════════════════════════

Skriv CLAUDE.md med dette innholdet:

---
# Portfolio Project — Claude Instructions

## Stack
Astro 4.x · Tailwind CSS · TypeScript strict · GitHub Pages / Vercel

## Filstruktur — respekter alltid denne
src/content/config.ts        → Zod-schema, endre kun ved ny felt
src/content/projects/        → Kun .md eksportert fra Obsidian
src/lib/tagColors.ts         → Eneste kilde til badge-farger
src/lib/github.ts            → Build-time fetch, aldri client-side

## Schema-felter (alle prosjekter)
title        string           påkrevd
status       WIP | Shipped | RIP | Soon | One day    påkrevd
type         Project | Job | Freelance Gig            påkrevd
dateRange    string           valgfri  ("Feb 1, 2024 → Mar 1, 2025")
tags         string[]         valgfri  (se tillatte verdier i tagColors.ts)
description  string           valgfri
url          string URL       valgfri
employer     string           valgfri  (kun Job og Freelance Gig)
image        string           valgfri  (lokal sti eller URL)
emoji        string           valgfri

## UI-regler — aldri fravike
1. Gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
2. Table: gruppert Freelance Gig → Job → Project
3. Toggle mellom Gallery/Table = vanilla JS, ingen React
4. Filter "Now" = vis kun status WIP
5. Alle farger fra tagColors.ts — ingen hardkodede farger i komponenter
6. Alltid <Image /> fra astro:assets for bilder
7. Ingen tung client-side JS

## Du skal ikke
- Installere nye npm-pakker uten å spørre
- Bruke `any` i TypeScript
- Slette eller overskrive filer i src/content/projects/
- Hardkode farger utenfor tagColors.ts
- Kjøre GitHub API-kall client-side

## Agenter tilgjengelig
.claude/agents/schema-agent.md       → schema-endringer og validering
.claude/agents/ui-agent.md           → komponenter og design
.claude/agents/sync-agent.md         → Obsidian → GitHub pipeline
.claude/agents/github-stats-agent.md → stars, språk, sist oppdatert
---


════════════════════════════════════════════════════════════════════
STEG 3 — FIRE AGENT-FILER
════════════════════════════════════════════════════════════════════

── .claude/agents/schema-agent.md ──────────────────────────────────

---
name: schema-agent
description: >
  Bruk meg ved schema-endringer, nye felter, enum-oppdateringer,
  eller validering av .md-filer mot Zod-schema.
  Triggers: "legg til felt", "valider md", "schema feiler på bygg".
tools: [read_file, write_file, run_command]
---

Du er Zod-ekspert for dette Astro-prosjektet.

Ansvar: src/content/config.ts og validering av src/content/projects/*.md

Arbeidsflyt:
1. Les gjeldende config.ts
2. Les berørt .md-fil hvis relevant
3. Gjør minimale endringer — ikke rør eksisterende felter uten eksplisitt instruksjon
4. Kjør `npm run build` og rapporter feil
5. Generer alltid eksempel-frontmatter som viser ny felt i bruk

Output: liste over endrede filer + eksempel-frontmatter + ev. migrasjonsinstruksjon

── .claude/agents/ui-agent.md ──────────────────────────────────────

---
name: ui-agent
description: >
  Bruk meg ved visuelle endringer, nye komponenter, layout-bugs,
  badge-farger og Tailwind-justeringer.
  Triggers: "kortet ser feil ut", "ny komponent", "endre badge-farge".
tools: [read_file, write_file, run_command]
---

Du er Astro + Tailwind-ekspert for dette porteføljeprosjektet.

Design-prinsipper (aldri fravike):
- Notion Gallery-estetikk: minimalistisk, hvitt, 1px border #e5e7eb
- Hover: translateY(-2px) + sterkere border — ingen box-shadow
- Badge-farger hentes alltid fra src/lib/tagColors.ts
- Ingen gradient, ingen tung shadow
- Font: system-ui / -apple-system

Ansvar:
- src/components/ProjectCard.astro
- src/components/FilterBar.astro
- src/components/TableView.astro
- src/components/Layout.astro

Arbeidsflyt:
1. Les relevant komponent
2. Les tagColors.ts ved fargeendringer
3. Gjør endringen
4. Sjekk at ingen andre komponenter som importerer dette brytes
5. Aldri legg til tung JS — kun toggle/filter i vanilla JS

Output: diff av endrede linjer + én setning om hva endringen gjør visuelt

── .claude/agents/sync-agent.md ────────────────────────────────────

---
name: sync-agent
description: >
  Bruk meg for Obsidian ↔ GitHub-synkronisering, GitHub Actions,
  rsync-regler og pipeline-feilsøking.
  Triggers: "sync feiler", "oppdater workflow", "ny Obsidian-mappe".
tools: [read_file, write_file, run_command]
---

Du vedlikeholder Obsidian → GitHub → Astro-pipelinen.

Arkitektur:
  Obsidian Vault (privat repo) / Portfolio/*.md
    → GitHub Action (trigger: push til obsidian-repo)
    → src/content/projects/*.md
    → Astro build
    → Statisk nettside

Filer du har ansvar for:
- .github/workflows/sync-obsidian.yml

Regler:
- rsync kopierer KUN .md-filer
- Workflow skal feile (exit 1) hvis påkrevde frontmatter-felter mangler
- Bruk GH_PAT secret, aldri GITHUB_TOKEN for cross-repo
- Commit-format: "sync: YYYY-MM-DD — N filer oppdatert"

Arbeidsflyt ved feil:
1. Les workflow-loggen brukeren limer inn
2. Identifiser om feilen er i rsync, git-operasjon eller frontmatter
3. Fiks det spesifikke steget
4. Foreslå test med workflow_dispatch

── .claude/agents/github-stats-agent.md ────────────────────────────

---
name: github-stats-agent
description: >
  Bruk meg for å hente/oppdatere GitHub-statistikk (stars, språk,
  sist oppdatert) for prosjekter.
  Triggers: "hent GitHub-stats", "stats oppdateres ikke", "legg til repo".
tools: [read_file, write_file, run_command]
---

Du vedlikeholder src/lib/github.ts og build-time datahenting.

Regler:
- All API-kall skjer build-time, aldri client-side
- Cache til public/github-cache.json — oppdateres kun ved build
- Bruk import.meta.env.GITHUB_TOKEN, aldri hardkod token
- Håndter feil elegant: returner null, ikke kræsj bygget

Interface du vedlikeholder:
  interface GitHubStats {
    stars: number
    language: string | null
    updatedAt: string   // format: "DD.MM.YYYY"
    url: string
  }
  async function getGitHubStats(repo: string): Promise<GitHubStats | null>
  // repo format: "brukernavn/repo-navn"

Output: hvilken URL ble kalt + om cache ble brukt eller live-kall


════════════════════════════════════════════════════════════════════
STEG 4 — KILDEKODE
════════════════════════════════════════════════════════════════════

── src/content/config.ts ───────────────────────────────────────────

import { defineCollection, z } from 'astro:content'

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    status:      z.enum(['WIP', 'Shipped', 'RIP', 'Soon', 'One day']),
    type:        z.enum(['Project', 'Job', 'Freelance Gig']),
    dateRange:   z.string().optional(),
    tags:        z.array(z.string()).default([]),
    description: z.string().optional(),
    url:         z.string().url().optional(),
    employer:    z.string().optional(),
    image:       z.string().optional(),
    emoji:       z.string().optional(),
  }),
})

export const collections = { projects }

── src/lib/tagColors.ts ────────────────────────────────────────────

export const TAG_COLORS: Record<string, string> = {
  App:            'bg-purple-100 text-purple-800',
  Education:      'bg-amber-100 text-amber-800',
  Branding:       'bg-pink-100 text-pink-800',
  Website:        'bg-green-100 text-green-800',
  Marketplace:    'bg-blue-100 text-blue-800',
  Data:           'bg-indigo-100 text-indigo-800',
  Logistics:      'bg-yellow-100 text-yellow-800',
  eComm:          'bg-rose-100 text-rose-800',
  Food:           'bg-orange-100 text-orange-800',
  Software:       'bg-teal-100 text-teal-800',
  VC:             'bg-violet-100 text-violet-800',
  Aerospace:      'bg-sky-100 text-sky-800',
  web3:           'bg-purple-100 text-purple-700',
  crypto:         'bg-amber-100 text-amber-700',
  Communications: 'bg-indigo-100 text-indigo-700',
  'API/SDK':      'bg-slate-100 text-slate-700',
  VIP:            'bg-violet-100 text-violet-800',
  Venue:          'bg-cyan-100 text-cyan-800',
}

export const STATUS_COLORS: Record<string, { dot: string; badge: string }> = {
  WIP:      { dot: 'bg-blue-500',  badge: 'bg-blue-100 text-blue-700'  },
  Shipped:  { dot: 'bg-green-500', badge: 'bg-green-100 text-green-700' },
  RIP:      { dot: 'bg-red-500',   badge: 'bg-red-100 text-red-700'    },
  Soon:     { dot: 'bg-gray-400',  badge: 'bg-gray-100 text-gray-600'  },
  'One day':{ dot: 'bg-gray-300',  badge: 'bg-gray-100 text-gray-500'  },
}

── src/lib/github.ts ───────────────────────────────────────────────

interface GitHubStats {
  stars: number
  language: string | null
  updatedAt: string
  url: string
}

export async function getGitHubStats(repo: string): Promise<GitHubStats | null> {
  const token = import.meta.env.GITHUB_TOKEN
  const headers: Record<string, string> = { 'User-Agent': 'portfolio-astro' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers })
    if (!res.ok) return null
    const d = await res.json()
    return {
      stars:     d.stargazers_count,
      language:  d.language ?? null,
      updatedAt: new Date(d.updated_at).toLocaleDateString('nb-NO'),
      url:       d.html_url,
    }
  } catch {
    return null
  }
}

── src/components/Layout.astro ─────────────────────────────────────

---
interface Props { title?: string }
const { title = 'Product Portfolio' } = Astro.props
---
<!doctype html>
<html lang="no">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  </head>
  <body class="bg-white text-gray-900 antialiased">
    <main class="max-w-6xl mx-auto px-4 py-8">
      <slot />
    </main>
  </body>
</html>

── src/components/ProjectCard.astro ────────────────────────────────

---
import { TAG_COLORS, STATUS_COLORS } from '../lib/tagColors'
interface Props {
  title: string; status: string; dateRange?: string
  tags: string[]; image?: string; emoji?: string; url?: string
}
const { title, status, dateRange, tags, image, emoji, url } = Astro.props
const st = STATUS_COLORS[status] ?? STATUS_COLORS['Soon']
---
<article class="border border-gray-200 rounded-md overflow-hidden bg-white
                transition-transform duration-150 hover:-translate-y-0.5
                hover:border-gray-400 cursor-pointer">
  <a href={url ?? '#'} target={url ? '_blank' : '_self'} rel="noopener">
    <div class="aspect-video bg-gray-100 overflow-hidden">
      {image
        ? <img src={image} alt={title} class="w-full h-full object-cover" loading="lazy" />
        : <div class="w-full h-full flex items-center justify-content-center
                      text-gray-300 text-sm">{emoji ?? '📁'}</div>}
    </div>
  </a>
  <div class="p-2.5">
    <p class="font-medium text-sm text-gray-900 mb-0.5 leading-snug">
      {emoji && <span class="mr-1">{emoji}</span>}{title}
    </p>
    {dateRange && <p class="text-xs text-gray-400 mb-1.5">{dateRange}</p>}
    <div class="flex flex-wrap gap-1">
      <span class={`text-[10.5px] px-1.5 py-0.5 rounded font-medium ${st.badge}`}>
        {status}
      </span>
      {tags.map(tag => (
        <span class={`text-[10.5px] px-1.5 py-0.5 rounded font-medium
          ${TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600'}`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
</article>

── src/components/FilterBar.astro ──────────────────────────────────

---
const tabs = [
  { label: 'All Projects', filter: 'all',    icon: '⊞' },
  { label: 'Now',          filter: 'now',    icon: '◎' },
  { label: 'Future',       filter: 'future', icon: '◷' },
  { label: 'All',          filter: 'all2',   icon: '✳' },
  { label: 'Bio',          filter: 'bio',    icon: '⧖' },
]
---
<nav class="flex items-center border-b border-gray-200 mb-5 gap-0">
  <div class="flex flex-1 overflow-x-auto">
    {tabs.map(t => (
      <button
        data-filter={t.filter}
        class="filter-btn border-b-2 border-transparent px-3 py-1.5 text-xs
               text-gray-500 hover:text-gray-900 whitespace-nowrap
               flex items-center gap-1 -mb-px transition-colors"
      >
        <span>{t.icon}</span>{t.label}
      </button>
    ))}
  </div>
  <div class="flex gap-1 pb-1">
    <button id="btn-gallery" class="view-btn active border border-gray-200
      rounded px-1.5 py-1 text-xs text-gray-500 hover:text-gray-900">⊞</button>
    <button id="btn-table" class="view-btn border border-gray-200
      rounded px-1.5 py-1 text-xs text-gray-500 hover:text-gray-900">☰</button>
  </div>
</nav>
<script>
  const filterBtns = document.querySelectorAll('.filter-btn')
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('border-gray-900','text-gray-900','font-medium'))
      btn.classList.add('border-gray-900','text-gray-900','font-medium')
      const f = btn.dataset.filter
      document.querySelectorAll('.project-card').forEach(c => {
        const card = c as HTMLElement
        if (f === 'all' || f === 'all2') { card.style.display = ''; return }
        if (f === 'now')    { card.style.display = card.dataset.status === 'WIP' ? '' : 'none'; return }
        if (f === 'future') { card.style.display = card.dataset.status === 'Soon' || card.dataset.status === 'One day' ? '' : 'none'; return }
        if (f === 'bio')    { card.style.display = 'none'; return }
      })
    })
  })
  document.getElementById('btn-gallery')?.addEventListener('click', () => {
    document.getElementById('gallery-view')!.style.display = ''
    document.getElementById('table-view')!.style.display = 'none'
    document.getElementById('btn-gallery')!.classList.add('bg-gray-100')
    document.getElementById('btn-table')!.classList.remove('bg-gray-100')
  })
  document.getElementById('btn-table')?.addEventListener('click', () => {
    document.getElementById('gallery-view')!.style.display = 'none'
    document.getElementById('table-view')!.style.display = ''
    document.getElementById('btn-table')!.classList.add('bg-gray-100')
    document.getElementById('btn-gallery')!.classList.remove('bg-gray-100')
  })
</script>

── src/components/TableView.astro ──────────────────────────────────

---
import { TAG_COLORS, STATUS_COLORS } from '../lib/tagColors'
interface Project {
  title: string; status: string; type: string; dateRange?: string
  description?: string; tags: string[]; url?: string; employer?: string; emoji?: string
}
interface Props { projects: Project[] }
const { projects } = Astro.props
const groups = ['Freelance Gig', 'Job', 'Project'] as const
const GROUP_BADGE: Record<string, string> = {
  'Freelance Gig': 'bg-amber-100 text-amber-800',
  'Job':           'bg-green-100 text-green-800',
  'Project':       'bg-purple-100 text-purple-800',
}
---
<div id="table-view" style="display:none">
  {groups.map(group => {
    const items = projects.filter(p => p.type === group)
    if (!items.length) return null
    return (
      <section class="mb-6">
        <div class="flex items-center gap-2 py-1.5 mb-0">
          <span class={`text-xs px-2 py-0.5 rounded font-medium ${GROUP_BADGE[group]}`}>
            {group}
          </span>
          <span class="text-xs text-gray-400">{items.length}</span>
        </div>
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-1.5 px-2 text-gray-400 font-normal w-24">Status</th>
              <th class="text-left py-1.5 px-2 text-gray-400 font-normal w-48">Name</th>
              <th class="text-left py-1.5 px-2 text-gray-400 font-normal w-36">When</th>
              <th class="text-left py-1.5 px-2 text-gray-400 font-normal">Description</th>
              {group !== 'Project' && <th class="text-left py-1.5 px-2 text-gray-400 font-normal w-32">Employer</th>}
              <th class="text-left py-1.5 px-2 text-gray-400 font-normal w-36">Tags</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => {
              const st = STATUS_COLORS[p.status] ?? STATUS_COLORS['Soon']
              return (
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                  <td class="py-1.5 px-2">
                    <div class="flex items-center gap-1.5">
                      <span class={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`}></span>
                      <span class={`px-1.5 py-0.5 rounded text-[10px] font-medium ${st.badge}`}>{p.status}</span>
                    </div>
                  </td>
                  <td class="py-1.5 px-2 font-medium text-gray-900">
                    {p.emoji && <span class="mr-1">{p.emoji}</span>}
                    {p.url
                      ? <a href={p.url} target="_blank" rel="noopener" class="hover:underline">{p.title}</a>
                      : p.title}
                  </td>
                  <td class="py-1.5 px-2 text-gray-400">{p.dateRange ?? '—'}</td>
                  <td class="py-1.5 px-2 text-gray-500">{p.description ?? ''}</td>
                  {group !== 'Project' && <td class="py-1.5 px-2 text-gray-400">{p.employer ?? ''}</td>}
                  <td class="py-1.5 px-2">
                    <div class="flex flex-wrap gap-1">
                      {p.tags.map(tag => (
                        <span class={`px-1.5 py-0.5 rounded text-[10px] font-medium
                          ${TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600'}`}>{tag}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    )
  })}
</div>

── src/pages/index.astro ───────────────────────────────────────────

---
import { getCollection } from 'astro:content'
import Layout from '../components/Layout.astro'
import ProjectCard from '../components/ProjectCard.astro'
import FilterBar from '../components/FilterBar.astro'
import TableView from '../components/TableView.astro'

const allProjects = await getCollection('projects')
const sorted = allProjects.sort((a, b) =>
  (b.data.dateRange ?? '').localeCompare(a.data.dateRange ?? ''))

const tableProjects = sorted.map(p => ({ ...p.data }))
---
<Layout title="Product Portfolio">
  <div class="mb-4">
    <h1 class="text-xl font-semibold flex items-center gap-2 mb-1">
      🗂️ Product Portfolio
    </h1>
    <p class="text-xs text-gray-400 space-x-2">
      <span>◆ Website</span><span>◆ Twitter</span><span>◆ CV</span><span>◆ Blog</span>
    </p>
  </div>

  <FilterBar />

  <div id="gallery-view"
       class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
    {sorted.map(p => (
      <div class="project-card" data-status={p.data.status}>
        <ProjectCard
          title={p.data.title}
          status={p.data.status}
          dateRange={p.data.dateRange}
          tags={p.data.tags}
          image={p.data.image}
          emoji={p.data.emoji}
          url={p.data.url}
        />
      </div>
    ))}
  </div>

  <TableView projects={tableProjects} />
</Layout>

── src/content/projects/example-project.md ─────────────────────────

---
title: "Afterhours Content Builder"
emoji: "🌙"
type: Project
status: WIP
dateRange: "February 1, 2026 → ongoing"
tags: ["App", "Education"]
description: "Visualise courses and subtopics and their interconnections."
url: ""
---

Selve innholdet i prosjektet skrives her som vanlig Markdown.

── .github/workflows/sync-obsidian.yml ─────────────────────────────

name: Sync Obsidian Projects

on:
  repository_dispatch:
    types: [obsidian-sync]
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Klon Obsidian-vault
        uses: actions/checkout@v4
        with:
          repository: ${{ secrets.OBSIDIAN_REPO }}
          token: ${{ secrets.GH_PAT }}
          path: obsidian-vault

      - name: Valider frontmatter
        run: |
          for f in obsidian-vault/Portfolio/*.md; do
            for field in title status type; do
              if ! grep -q "^${field}:" "$f"; then
                echo "FEIL: Mangler '${field}' i $f"
                exit 1
              fi
            done
          done

      - name: Kopier prosjektfiler
        run: |
          rsync -av --include="*.md" --exclude="*" \
            obsidian-vault/Portfolio/ \
            src/content/projects/

      - name: Commit og push
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "actions@github.com"
          COUNT=$(git diff --staged --name-only | wc -l)
          git add src/content/projects/
          git diff --staged --quiet || \
            git commit -m "sync: $(date +%Y-%m-%d) — ${COUNT} filer oppdatert"
          git push

── astro.config.mjs ────────────────────────────────────────────────

import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
})

── tailwind.config.mjs ─────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: { extend: {} },
  plugins: [],
}

── tsconfig.json ───────────────────────────────────────────────────

{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}


════════════════════════════════════════════════════════════════════
STEG 5 — INSTALLER OG VERIFISER
════════════════════════════════════════════════════════════════════

Etter at alle filer er skrevet, kjør disse kommandoene i rekkefølge:

  npm create astro@latest my-portfolio -- --template minimal --no-install
  cd my-portfolio
  npm install
  npx astro add tailwind --yes
  npm run build

Hvis bygget feiler, les feilmeldingen og fiks det selv.
Rapporter til slutt:
  ✓ hvilke filer som ble opprettet
  ✓ om bygget var vellykket
  ✓ eventuelle advarsler jeg bør vite om


════════════════════════════════════════════════════════════════════
DAGLIG BRUK — eksempel-prompts etter setup
════════════════════════════════════════════════════════════════════

Nytt prosjekt fra Obsidian:
  > Bruk schema-agent. Valider denne frontmatteren og si om den er gyldig:
    title: "Fishbowl" / type: Project / status: WIP / tags: [App]

Ny badge-farge:
  > Bruk ui-agent. Legg til fargen for "Design"-taggen i tagColors.ts.

Sync feiler:
  > Bruk sync-agent. Workflow feiler med denne loggen: [lim inn]

GitHub-stats:
  > Bruk github-stats-agent. Hent stats for "mittbrukernavn/fishbowl"
    og vis dem på Fishbowl-kortet i ProjectCard.astro.
