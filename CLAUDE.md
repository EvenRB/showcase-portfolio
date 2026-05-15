# Portfolio — Claude Instructions

## Stack
Astro 4.x · TypeScript strict · plain CSS (no Tailwind) · Vercel static deploy.
No React / Svelte / Vue. Interactivity is vanilla JS inside `<script>` blocks
within `.astro` files.

## File structure — respect this always
```
src/content/config.ts          → Zod schema for projects collection
src/content/projects/          → Each project = one .md file (frontmatter + body)
src/lib/github.ts              → Build-time GitHub API client (returns null on fail)
src/lib/projects.ts            → Aggregates content + GH stats; sort/featured helpers
src/styles/global.css          → ALL styles — design tokens + themes + 3 color modes
src/components/
  Layout.astro                 → HTML shell + font + pre-paint mode restore
  PageHeader.astro             → Identity strip + stats + ModeToggle slot
  ModeToggle.astro             → light/dark/navy picker; writes data-mode + localStorage
  FilterBar.astro              → Tabs with vanilla-JS live filtering of cards
  BentoGrid.astro              → Wraps card list; `promote` flag = 2 hero cards
  ProjectCard.astro            → Showcase card with LivePreview slot
  LivePreview.astro            → Click-to-load iframe with blocked-site fallback
  PreviewArt.astro             → CSS-only generative placeholder per mood
  StatusPulse.astro            → Animated status dot
  LangBar.astro                → Language distribution strip
  ProjectDetail.astro          → Property-table + live embed + markdown body
src/pages/index.astro          → Showcase (gallery)
src/pages/projects/[id].astro  → Per-project detail (getStaticPaths)
_design-backup/tailwind/       → Alternative Tailwind design (preserved, not active)
```

## Schema fields (all projects)

| Field         | Type                  | Notes                                                |
| ------------- | --------------------- | ---------------------------------------------------- |
| title         | string  **required**  |                                                      |
| status        | enum    **required**  | WIP / Shipped / RIP / Soon / One day                 |
| type          | enum    **required**  | Project / Job / Freelance Gig                        |
| emoji         | string                | Small mark in card + detail icon                     |
| dateRange     | string                | Free-form, e.g. `"Feb 2026 → ongoing"`               |
| tags          | string[]              | Visual chips (industry categories, not tech stack)   |
| description   | string                | One-line summary                                     |
| url           | string (URL)          | Live deployed site — powers the iframe preview       |
| repo          | string                | `owner/repo` — drives GH stats at build time         |
| repoUrl       | string (URL)          | Overrides if not on GitHub                           |
| employer      | string                | Only for Job / Freelance Gig                         |
| image         | string                | Optional static cover                                |
| featured      | boolean               | Max 2 — promoted to hero card when `promote` is on   |
| previewBase   | hex string            | Placeholder bg colour for PreviewArt                 |
| previewAccent | hex string            | Placeholder accent colour                            |
| previewMood   | enum                  | editor / voice / map / graph / list / doc / cli / table / dashboard / reader / system / cms / default |

## Design rules — never break
1. **Tokens only.** All colour goes through CSS custom properties (`--bg`, `--ink`,
   `--accent`, etc.) defined in `global.css`. Never hardcode hex in component files.
2. **Three color modes** driven by `[data-mode]` on `<html>`:
   `light` (warm off-white, default) · `dark` (warm black) · `navy` (midnight blue).
   Read mode from `localStorage('portfolio-mode')` before first paint to avoid flash.
3. **No client framework.** Interactivity = vanilla JS in `<script>` inside `.astro`.
4. **GitHub fetches at build time only.** `getGitHubStats()` returns `null` on failure —
   never crash the build, never call from client code.
5. **Mobile breakpoints**: 1024px (tablet → 2-col bento) and 640px (phone → 1-col).
6. **Borders, not shadows.** 1px hairlines from `var(--line)`. No `box-shadow`.
7. **Type**: Inter (UI) + JetBrains Mono (technical/metadata). Don't add a third font.

## Tag categories (industry, not tech stack)
App · Education · Branding · Website · Marketplace · Data · Logistics · eComm ·
Food · Software · VC · Aerospace · web3 · crypto · Communications · API/SDK · VIP · Venue

Tag colours are defined as CSS classes (`.dv-pill.tag-app`, `.dv-pill.tag-edu`, etc.)
in `global.css` — not in a JS file. To add a new tag, add its CSS class there.

## Deploy
- **Vercel** auto-deploys from `main`. Set `PUBLIC_GITHUB_TOKEN` in Vercel dashboard
  (Project Settings → Environment Variables) so build-time stats fetches authenticate.
- Never commit `.env` files. Never hardcode tokens in source.

## You shall not
- Install Tailwind — the design system is hand-rolled CSS variables.
- Add React/Svelte/Vue unless a widget genuinely cannot be done in vanilla JS.
- Use `any` in TypeScript.
- Hardcode colours outside `global.css`.
- Call GitHub API from client code.
- Delete or overwrite files in `src/content/projects/` without asking.
- Touch `_design-backup/` — it is archived code, not active.

## Agents available
```
.claude/agents/schema-agent.md        → Zod schema changes and .md frontmatter validation
.claude/agents/ui-agent.md            → Components, CSS tokens, and design adjustments
.claude/agents/sync-agent.md          → Obsidian → GitHub Actions pipeline
.claude/agents/github-stats-agent.md  → src/lib/github.ts and build-time stats
```

## Common tasks

**Add a new project**
1. Create `src/content/projects/<slug>.md` with valid frontmatter (see schema above).
2. `npm run build` — Astro type-checks frontmatter against the Zod schema.

**Change accent colour**
Edit `--accent` in `.page.theme-stone` at the top of `global.css`.
Dark and Navy modes have their own `--accent` overrides further down.

**Add a new tag category**
1. Add it to the allowed tags list above (and in a CLAUDE.md update if needed).
2. Add `.dv-pill.tag-<name>` CSS class in `global.css` with light/dark/navy variants.

**Add a new previewMood**
1. Add it to the enum in `src/content/config.ts`.
2. Add a render branch in `PreviewArt.astro`.
3. Add the CSS for `.pa-<mood>` in `global.css`.

**Hook up GitHub stats**
Set `repo: "owner/repo"` in project frontmatter. Done — `getGitHubStats()` picks it up.
