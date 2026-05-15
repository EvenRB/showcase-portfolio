# Tailwind Design Backup

This directory preserves the simpler Tailwind CSS–based design from the original Step 3–5 spec.
The active design uses the CSS-variable system from the ZIP (no Tailwind).

To restore: copy these components into `src/components/`, `src/lib/`, and `src/pages/`,
then install Tailwind (`npx astro add tailwind --yes`) and swap `global.css` for Tailwind.

## Key differences vs active design
- Uses Tailwind utility classes, not CSS custom properties
- Tags use JavaScript `TAG_COLORS` record, not CSS class names in global.css
- No per-project detail page ([id].astro)
- No Live Preview / PreviewArt placeholder
- No dark/navy color modes
- Table view separated into its own TableView.astro component
