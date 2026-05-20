# Background & Header Visual Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the animated blob background visible in all three color modes, and replace the square glyph border in the page header with a rounded accent-tinted box.

**Architecture:** All changes are pure CSS in `src/styles/global.css`. No JS, no new components, no new tokens — only existing values are updated. The blob colors are CSS custom properties read by the canvas animation at runtime; changing them automatically updates the animation.

**Tech Stack:** Plain CSS, Astro 4.x, Vercel static deploy. No build step needed to preview — run `npm run dev`.

---

## Files

| Action | Path | What changes |
|--------|------|--------------|
| Modify | `src/styles/global.css:38-49` | Blob color tokens — all three modes |
| Modify | `src/styles/global.css:2226-2228` | Page overlay opacities — all three modes |
| Modify | `src/styles/global.css:145-151` | `.ph-glyph` border, radius, background |

---

### Task 1: Update light mode blob colors

**Files:**
- Modify: `src/styles/global.css:38-39`

- [ ] **Step 1: Open the file and locate the light blob tokens**

They are on lines 37-39, inside the `:root` block:
```css
  /* Blob background — light palette */
  --blob-1: #E8A87C; --blob-2: #A8C4E0; --blob-3: #C4A8D8;
  --blob-4: #A8D4B8; --blob-5: #E8C87C; --blob-6: #C8A0C0;
```

- [ ] **Step 2: Replace with more saturated values**

```css
  /* Blob background — light palette */
  --blob-1: #E89050; --blob-2: #80AEDD; --blob-3: #B080CC;
  --blob-4: #80C4A0; --blob-5: #E09040; --blob-6: #A870B8;
```

- [ ] **Step 3: Start dev server and verify in browser**

```bash
npm run dev
```

Open http://localhost:4321. In light mode the blobs should be subtly visible as warm coloured washes behind the page content. If they are not visible at all, the overlay opacity task (Task 4) must also be applied first.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "fix: increase light mode blob color saturation for visibility"
```

---

### Task 2: Update dark mode blob colors

**Files:**
- Modify: `src/styles/global.css:42-45`

- [ ] **Step 1: Locate the dark mode blob block**

Lines 42-45:
```css
[data-mode="dark"] {
  --blob-1: #8B3A1F; --blob-2: #1A4A7C; --blob-3: #5A2A7C;
  --blob-4: #1A5A30; --blob-5: #7A5010; --blob-6: #5A1A5A;
}
```

- [ ] **Step 2: Replace with lighter values**

```css
[data-mode="dark"] {
  --blob-1: #C0522A; --blob-2: #2A6AAC; --blob-3: #7A3AAC;
  --blob-4: #2A7A44; --blob-5: #A07020; --blob-6: #7A2A7A;
}
```

- [ ] **Step 3: Verify in browser**

Switch to dark mode using the toggle in the header. Blobs should glow as warm orange/blue/purple washes. They will be faint until Task 4 reduces the overlay opacity.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "fix: lighten dark mode blob colors for visibility"
```

---

### Task 3: Update navy mode blob colors

**Files:**
- Modify: `src/styles/global.css:46-49`

- [ ] **Step 1: Locate the navy mode blob block**

Lines 46-49:
```css
[data-mode="navy"] {
  --blob-1: #0A3870; --blob-2: #1A1080; --blob-3: #0A5050;
  --blob-4: #301880; --blob-5: #0A2850; --blob-6: #183860;
}
```

- [ ] **Step 2: Replace with lighter blue/teal values**

```css
[data-mode="navy"] {
  --blob-1: #1A60D0; --blob-2: #2A28C0; --blob-3: #0A7878;
  --blob-4: #4428C0; --blob-5: #1A4888; --blob-6: #283898;
}
```

- [ ] **Step 3: Verify in browser**

Switch to navy mode. Blobs should appear as deep blue and teal glows.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "fix: lighten navy mode blob colors for visibility"
```

---

### Task 4: Reduce page overlay opacity for all three modes

**Files:**
- Modify: `src/styles/global.css:2226-2228`

- [ ] **Step 1: Locate the overlay rules**

Lines 2226-2228:
```css
.page.theme-stone                    { background: rgba(250, 248, 244, 0.68); }
[data-mode="dark"] .page.theme-stone { background: rgba(20,  17,  12,  0.82); }
[data-mode="navy"] .page.theme-stone { background: rgba(14,  24,  40,  0.82); }
```

- [ ] **Step 2: Reduce opacities**

```css
.page.theme-stone                    { background: rgba(250, 248, 244, 0.40); }
[data-mode="dark"] .page.theme-stone { background: rgba(20,  17,  12,  0.60); }
[data-mode="navy"] .page.theme-stone { background: rgba(14,  24,  40,  0.60); }
```

- [ ] **Step 3: Verify all three modes in browser**

Cycle through light → dark → navy. In each mode:
- Blobs are visible as soft colour washes behind page content
- Page text and cards remain fully readable
- No blobs should bleed through card backgrounds or text

If text legibility is affected, increase the opacity slightly (e.g. 0.45 for light, 0.65 for dark/navy).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "fix: reduce page overlay opacity so blob background is visible"
```

---

### Task 5: Fix header glyph — rounded accent border

**Files:**
- Modify: `src/styles/global.css:145-151`

- [ ] **Step 1: Locate the `.ph-glyph` rule**

Lines 145-151:
```css
.ph-glyph {
  width: 28px; height: 28px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--line-2);
  font-size: 14px;
  background: var(--bg);
}
```

- [ ] **Step 2: Replace border and background**

```css
.ph-glyph {
  width: 28px; height: 28px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--accent);
  border-radius: 4px;
  font-size: 14px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
```

- [ ] **Step 3: Verify in browser across all three modes**

The `◐` symbol should sit inside a softly accent-tinted rounded box. Check light, dark, and navy — the accent colour changes per mode so the glyph should always match the current theme's accent.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "fix: round header glyph border and tint with accent color"
```

---

## Done

All five tasks applied. Final check: cycle through all three modes and confirm:
- [ ] Blobs visible in light mode (soft pastel washes)
- [ ] Blobs visible in dark mode (warm glows)
- [ ] Blobs visible in navy mode (blue/teal glows)
- [ ] Page content readable in all modes
- [ ] `◐` glyph shows rounded accent border in header
