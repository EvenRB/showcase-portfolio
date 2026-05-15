# Even R Brekne — Portfolio

**Live:** [evenrb.vercel.app](https://evenrb.vercel.app)

Static portfolio site built with Astro. Project content lives in Markdown files, GitHub stats are fetched at build time, deployed as static HTML to Vercel.

## Stack

- **Astro 4.x** — static output, no SSR adapter
- **TypeScript** strict mode
- **Plain CSS** with CSS custom properties and three color modes (light / dark / navy)
- **No client framework** — vanilla JS only for interactive bits

## Local development

```bash
npm install
npm run dev
```

## GitHub stats (optional)

To pull live star counts, languages, and commit info at build time, add a GitHub personal access token to `.env`:

```
PUBLIC_GITHUB_TOKEN=your_token_here
```

Requires only `public_repo` (read-only) scope. Without it the build succeeds but GitHub stats fields will be empty.

For Vercel: add `PUBLIC_GITHUB_TOKEN` under **Project Settings → Environment Variables**.

## Add a project

Drop a Markdown file into `src/content/projects/`. Minimal frontmatter:

```yaml
---
title: "Project name"
type: Project              # Project | Job | Freelance Gig
status: WIP                # WIP | Shipped | RIP | Soon | One day
tags: ["App"]
description: "One-line summary."
url: "https://your-live-site.com"
repo: "knyttneven/repo-name"
featured: false
previewMood: default
---
```

`previewMood` options: `editor · voice · map · graph · list · doc · cli · table · dashboard · reader · system · cms · default`

## Agents

See [`AGENTS.md`](./AGENTS.md) for the agent definitions that govern how AI assistants should work in this codebase.
