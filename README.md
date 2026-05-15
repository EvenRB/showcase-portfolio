# Even R Brekne — Portfolio (Astro starter)

Static portfolio site. Reads project content from local Markdown files,
fetches live GitHub stats at build time, deploys as static HTML to Vercel.

## Stack
- **Astro 4.x** · static output (no SSR adapter needed)
- **TypeScript** strict
- **Plain CSS** with CSS custom properties (no Tailwind — see HANDOFF.md)
- **No client framework** — vanilla JS in `<script>` blocks for the bits that move

## Quickstart
```bash
npm install
npm run dev
```
Open `http://localhost:4321`.

To pull live GitHub stats, set a token in `.env`:
```
PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxx
```
(read-only public scope is enough — the build only reads public repo metadata.)

## Add a project
Drop a Markdown file into `src/content/projects/`. Frontmatter shape:

```yaml
---
title: "Fishbowl"
emoji: "◇"
type: Project              # Project | Job | Freelance Gig
status: WIP                # WIP | Shipped | RIP | Soon | One day
dateRange: "Nov 2025 → ongoing"
tags: ["App", "Communications"]
description: "Async voice notes between teams in flow state."
url: "https://fishbowl.example.com"     # live URL (deployed)
repo: "evenrbrekne/fishbowl"             # owner/repo → drives GH stats
featured: true                            # max 2 ever — promotes to hero card
previewMood: voice                        # visual mood for the placeholder
previewBase: "#0f172a"
previewAccent: "#22D3EE"
---
Markdown body shows on the project detail page.
```

`previewMood` is one of: `editor · voice · map · graph · list · doc · cli · table · dashboard · reader · system · cms · default`.

## Deploy to Vercel
```bash
vercel
```
Vercel auto-detects Astro and builds with `npm run build`, serving `/dist`.
Set `PUBLIC_GITHUB_TOKEN` in the Vercel project's environment variables so
build-time GitHub fetches lift past the unauthenticated rate limit.

See HANDOFF.md for how this folder maps to the broader project plan.
