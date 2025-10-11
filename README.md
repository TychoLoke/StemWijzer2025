# StemWijzer 2025 Web App

A modern, mobile-first React experience that lets Gen-Z voters explore their political profile for the 2025 Dutch elections. The app now ships with a full project structure, reusable UI components, and dedicated data modules for parties, questions, and coalition presets.

## Features

- 🎯 25-statement quiz with Likert scale interactions and contextual “why” breakdowns per axis.
- 🧠 Persona engine that highlights your voter archetype, weighted by personal importance sliders.
- 🗺️ Interactive results map (Recharts) with PNG export and optional party labels.
- 🧩 Coalition builder supporting preset seat distributions and majority tracking.
- 🧪 Lightweight runtime sanity checks that validate datasets during development.

## Development

Install dependencies and start the Vite dev server:

```bash
npm install
npm run dev
```

## Production build

Create an optimized production bundle (output in `dist/`):

```bash
npm run build
```

Deploy the generated `dist/` folder to any static hosting provider (e.g. Vercel). Configure the build command as `npm run build` and output directory as `dist`.
