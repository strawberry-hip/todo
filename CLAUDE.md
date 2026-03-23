# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Type-check + production build (output: dist/)
npm run preview  # Preview production build locally
npx tsc --noEmit # Type-check only (no output files)
```

No test framework is configured.

## Architecture

Single-page React app with no routing, no external state library, and no backend. All data lives in `localStorage`.

**Data flow:**
- `src/types/todo.ts` — central type definitions (`Todo`, `Priority`, `FilterState`, `SortBy`)
- `src/utils/storage.ts` — raw localStorage read/write (todos + theme)
- `src/hooks/useTodos.ts` — all TODO state: CRUD, filtering, sorting, derived `stats` and `categories`. Calls `storage.ts` on every mutation.
- `src/hooks/useTheme.ts` — dark/light mode; applies `dark` class to `<html>`, reads OS preference as default
- `src/App.tsx` — composes hooks and passes props down; no prop drilling beyond one level

**Component responsibilities:**
- `Header` — title + theme toggle button
- `AddTodoForm` — collapsed by default, expands on focus; uses `<datalist>` for category autocomplete
- `FilterBar` — status toggle group + priority/category/sort selects + search input
- `TodoItem` — switches between read view and inline edit form; computes overdue state locally
- `TodoList` — renders list or empty state
- `StatsBar` — completion progress bar derived from `stats`

**Tailwind dark mode** uses the `class` strategy — the `dark` class on `<html>` enables dark variants. Defined in `tailwind.config.js`.

**ID generation** — `${Date.now()}-${random}` in `useTodos.ts`, no external UUID library.

**Category "未分類"** is the fallback when category input is left blank (enforced in both `AddTodoForm` and `TodoItem`).
