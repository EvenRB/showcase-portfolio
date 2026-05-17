---
title: "Kritisk læring"
emoji: "🧠"
type: Project
status: Shipped
dateRange: "Mai 2026"
tags: ["Education", "App"]
tech: ["next", "ts", "tailwind", "shadcn", "github"]
description: "Interaktivt nettverktøy som lærer folk å tenke kritisk om KI-svar — ikke ved å forklare, men ved å la dem oppleve forskjellen selv."
url: "https://EvenRB.github.io/kritisk-laering/"
screenshotUrl: "https://EvenRB.github.io/kritisk-laering/?v=1"
repo: "EvenRB/kritisk-laering"
featured: false
previewBase: "#1e1b4b"
previewAccent: "#34d399"
previewMood: compare
---

Målgruppe: lærere og pedagoger. Kjernen er aha-øyeblikket — brukeren opplever selv hvordan KI-svar endres radikalt basert på konteksten de gir. Ingen forklaring først. Bare opplevelsen.

## Konsept

KI svarer alltid. Men svaret avhenger fullstendig av konteksten du gir. Uten instruksjoner gjetter KI seg frem til det mest behagelige svaret — ikke det mest presise.

Verktøyet illustrerer tre konkrete mekanismer:

- **Tone maskerer** — KI erstatter faglig analyse med behagelig, varm tone. Svaret høres bra ut men inneholder ingen reell informasjon.
- **Skjult antakelse** — KI bekrefter en antakelse som ligger bakt inn i spørsmålet, uten å stille spørsmål ved den.
- **Usynlig brukerantagelse** — KI gjør antakelser om hvem du er (frisk, gjennomsnittlig, uten risikofaktorer) uten å si det.

## Brukerflyt

1. **Aha-øyeblikket** — to KI-svar side om side på samme spørsmål, ett uten og ett med instruksjoner
2. **Velg kontekst** — Utdanning / Teknisk / Generelt
3. **Skru på instruksjoner** — 6 bryterne som bygger instruksjonsteksten
4. **Eksporter** — ferdig instrukstekst klar til å lime inn i Claude, ChatGPT eller Copilot

## Tech-stack

- **Framework**: Next.js 14+ med App Router, TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Hosting**: GitHub Pages via GitHub Actions (statisk eksport)
- **Ingen backend** — stateless MVP, all innhold hardkodet i `src/content/`

## Pedagogisk forankring

Forankret i Udirs overordnet del 1.3 (kritisk tenkning og etisk bevissthet) og rammeverket for digital dømmekraft.
