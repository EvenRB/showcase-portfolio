# AGENTS.md

Agent definitions for this Astro portfolio project.
Each agent has a fixed scope — never cross boundaries without explicit instruction.

---

## schema-agent
**Scope:** `src/content/config.ts`, `src/content/projects/*.md`
**Triggers:** "legg til felt", "valider md", "schema feiler på bygg"

Rules:
- Read current `config.ts` before any change
- Read the affected `.md` file if relevant
- Make minimal changes — never touch existing fields without explicit instruction
- Run `npm run build` and report errors
- Always output example frontmatter showing the new field in use
- When frontmatter fields are added or changed, output a migration note listing which `.md` files need updating
- Never touch any `.astro` or `.css` file

Allowed status values: `WIP | Shipped | RIP | Soon | One day`
Allowed type values: `Project | Job | Freelance Gig`

Existing schema fields (never change without instruction):
`title, status, type, emoji, dateRange, tags, description, url, repo, repoUrl, employer, image, featured, previewBase, previewAccent, previewMood`

Output: list of changed files + example frontmatter + migration note if applicable

---

## ui-agent
**Scope:** `src/components/*.astro`, `src/styles/global.css`
**Triggers:** "kortet ser feil ut", "ny komponent", "endre farge", "layout er galt"

Rules:
- All colors via CSS custom properties (`--bg`, `--ink`, `--accent`, etc.) — never hardcode hex in component files
- Three color modes (`light / dark / navy`) via `[data-mode]` on `<html>`
- Hover: no `box-shadow` — use `translateY(-2px)` + stronger border
- Font: Inter (UI) + JetBrains Mono (technical) — never add a third font
- Borders, not shadows — 1px hairlines via `var(--line)`
- When targeting a specific file, only open that file — do not read the entire `src/components/` directory
- Changes must be scoped to the single component mentioned in the prompt
- Always confirm target file before starting: `"Target: [filename] — ui-agent"`

Components maintained:
`Layout.astro, PageHeader.astro, ModeToggle.astro, FilterBar.astro, BentoGrid.astro, ProjectCard.astro, LivePreview.astro, PreviewArt.astro, StatusPulse.astro, LangBar.astro, ProjectDetail.astro`

Workflow:
1. State target file
2. Read only that component
3. Read `global.css` only for color changes
4. Make the change
5. Verify no other components that import this are broken
6. Never add heavy JS — only vanilla JS in `<script>` inside `.astro` files

Fallback: Tailwind version is archived in `_design-backup/tailwind/` — not active.

Output: diff of changed lines + one sentence describing the visual change

---

## sync-agent
**Scope:** `.github/workflows/`, `src/content/projects/`
**Triggers:** "sync feiler", "oppdater workflow", "ny Obsidian-mappe"

Architecture:
```
Obsidian Vault (private repo) / Portfolio/*.md
  → GitHub Action (trigger: repository_dispatch + schedule + workflow_dispatch)
  → src/content/projects/*.md
  → Astro build (Vercel auto-deploy from main)
  → Static portfolio site
```

Rules:
- rsync copies ONLY `.md` files
- Workflow must fail (`exit 1`) if required frontmatter fields (`title`, `status`, `type`) are missing
- Use `GH_PAT` secret for cross-repo checkout, never `GITHUB_TOKEN`
- Commit format: `sync: YYYY-MM-DD — N filer oppdatert`
- Obsidian repo fetched via `secrets.OBSIDIAN_REPO` — never hardcode repo name
- Never modify any file outside `src/content/projects/` and `.github/workflows/`
- If a sync causes a schema validation error, stop and report to schema-agent instead of auto-fixing

Workflow on error:
1. Read the workflow log the user pastes
2. Identify if the error is in rsync, git operation, or frontmatter validation
3. Fix that specific step
4. Suggest a test with `workflow_dispatch`

---

## github-stats-agent
**Scope:** `src/lib/github.ts`, `.astro` files that import from it
**Triggers:** "hent GitHub-stats", "stats oppdateres ikke", "legg til repo"

Rules:
- Only runs at build time, never client-side
- Only touches `src/lib/github.ts` and any `.astro` file that imports from it
- Never modifies frontmatter or content files
- Use module-level Map as cache — avoid duplicate calls per build
- Use `import.meta.env.PUBLIC_GITHUB_TOKEN` (Vercel) or `GITHUB_TOKEN` (local)
- Handle errors gracefully: return `null`, never crash the build
- Fetch repo + languages + latest commit in parallel (`Promise.all`)

Interface maintained:
```typescript
interface GitHubStats {
  stars: number
  forks: number
  language: string | null
  languages: { name: string; pct: number; color: string }[]
  updatedAt: string          // ISO 8601
  updatedAtLabel: string     // e.g. "3d ago"
  commit: string             // 7-char short SHA
  url: string
}

async function getGitHubStats(repo: string): Promise<GitHubStats | null>
// repo format: "owner/repo-name"
```

To add a new repo: set `repo: "owner/repo"` in project `.md` frontmatter — `src/lib/projects.ts` picks it up automatically at build time.

Output: which API URLs were called + whether cache was used or live call was made

---

## ux-agent
**Scope:** `src/pages/`, `src/components/`
**Triggers:** "navigasjon er forvirrende", "endre flyt", "informasjonsarkitektur", "filter virker ikke"

Rules:
- Only modify user flow, navigation, interaction logic, and information architecture
- Never touch visual styling (colors, fonts, spacing) — that belongs to ui-agent
- Never touch `src/content/`, `src/lib/`, or any schema/validation files
- When changing navigation or filters, update only the relevant page component
- Always preserve existing Astro routing and `getStaticPaths()` logic

---

## cli-agent
**Scope:** Project-wide orchestration only
**Triggers:** Any multi-scope task, "hvem eier denne oppgaven", "rut oppgaven"

Rules:
- Acts as dispatcher — reads `AGENTS.md` and routes tasks to the correct agent
- When given a task, first state which agent owns it and which file(s) will be touched
- Never makes code changes directly
- If a task touches multiple agent scopes, split it into subtasks per agent
- Always confirm target file before starting: `"Target: src/components/CardCover.astro — ui-agent"`
