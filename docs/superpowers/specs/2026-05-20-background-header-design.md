# Background & Header Visual Fix — Design Spec

**Date:** 2026-05-20
**Scope:** `src/styles/global.css` · `src/components/Layout.astro`

---

## Problem

Three visual issues identified:

1. **Blob background barely visible in all modes** — the `.page.theme-stone` overlay is too opaque, hiding the animated canvas blobs underneath.
2. **Dark and Navy modes too dark** — overlay opacity 0.82 leaves both modes near-black; blob colors are also too dark/saturated to show through.
3. **Square border on `◐` glyph in PageHeader** — `.ph-glyph` has a square `border` + square `background`, which looks unpolished.

---

## Design Decisions

### 1. Light mode overlay + blob colors

| | Before | After |
|---|---|---|
| Overlay | `rgba(250,248,244, 0.68)` | `rgba(250,248,244, 0.40)` |
| `--blob-1` | `#E8A87C` | `#E89050` |
| `--blob-2` | `#A8C4E0` | `#80AEDD` |
| `--blob-3` | `#C4A8D8` | `#B080CC` |
| `--blob-4` | `#A8D4B8` | `#80C4A0` |
| `--blob-5` | `#E8C87C` | `#E09040` |
| `--blob-6` | `#C8A0C0` | `#A870B8` |

### 2. Dark mode overlay + blob colors

| | Before | After |
|---|---|---|
| Overlay | `rgba(20,17,12, 0.82)` | `rgba(20,17,12, 0.60)` |
| `--blob-1` | `#8B3A1F` | `#C0522A` |
| `--blob-2` | `#1A4A7C` | `#2A6AAC` |
| `--blob-3` | `#5A2A7C` | `#7A3AAC` |
| `--blob-4` | `#1A5A30` | `#2A7A44` |
| `--blob-5` | `#7A5010` | `#A07020` |
| `--blob-6` | `#5A1A5A` | `#7A2A7A` |

### 3. Navy mode overlay + blob colors

| | Before | After |
|---|---|---|
| Overlay | `rgba(14,24,40, 0.82)` | `rgba(14,24,40, 0.60)` |
| `--blob-1` | `#0A3870` | `#1A60D0` |
| `--blob-2` | `#1A1080` | `#2A28C0` |
| `--blob-3` | `#0A5050` | `#0A7878` |
| `--blob-4` | `#301880` | `#4428C0` |
| `--blob-5` | `#0A2850` | `#1A4888` |
| `--blob-6` | `#183860` | `#283898` |

### 4. Header glyph `◐`

`.ph-glyph` changes from square to accent-tinted rounded box:

```css
/* Before */
border: 1px solid var(--line-2);
background: var(--bg);

/* After */
border: 1px solid var(--accent);
border-radius: 4px;
background: color-mix(in srgb, var(--accent) 12%, transparent);
```

---

## Files Changed

| File | Change |
|---|---|
| `src/styles/global.css` | `--blob-1..6` values for all 3 modes; `.page.theme-stone` overlay opacities; `.ph-glyph` border/radius/background |

No changes to `Layout.astro` JS logic — only CSS values change.

---

## Out of Scope

- Blob animation behavior (speed, count, mouse attraction)
- Typography, layout, or other header styles
- Any new components
