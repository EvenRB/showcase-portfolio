import { defineConfig } from 'astro/config';

// Static output works perfectly with Vercel's auto-detect.
// No adapter needed — Vercel serves /dist as a static site.
export default defineConfig({
  output: 'static',
  site: 'https://evenrbrekne.com',  // change to your prod URL
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Smaller payloads, single CSS file per entry.
      cssCodeSplit: false,
    },
  },
});
