# StemWijzer 2025 Web App

A modern, mobile-first React experience that lets Gen-Z voters explore their political profile for the 2025 Dutch elections. The app now ships with a full project structure, reusable UI components, and dedicated data modules for parties, questions, and coalition presets.

## Features

- 🎯 25-statement quiz with Likert scale interactions and contextual “why” breakdowns per axis.
- 🧠 Persona engine that highlights your voter archetype, weighted by personal importance sliders.
- 🗺️ Interactive results map (Recharts) with PNG export and optional party labels.
- 🧩 Coalition builder supporting preset seat distributions and majority tracking.
- 🧪 Lightweight runtime sanity checks that validate datasets during development.

## Development

This project assumes a standard React toolchain (e.g. Vite or CRA). Key entry points:

- `src/main.tsx` – bootstraps the React app.
- `src/App.tsx` – app shell with tab navigation.
- `src/pages/QuizExperience.tsx` – orchestrates the quiz flow via the `useQuizEngine` hook.
- `src/components` – shared UI elements (Likert scale, axis chips, results map, coalition builder, etc.).
- `src/data` – strongly typed datasets for axes, parties, questions, and polling presets.
- `src/utils/quiz.ts` – quiz math helpers (user vector, similarity scoring, etc.).

To start hacking, install dependencies and run your bundler/dev server of choice:

```bash
npm install
npm run dev
```

> ℹ️ The repo intentionally omits bundler configuration since environments vary; drop these sources into your preferred React stack.

