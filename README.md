# Internship Board (React + TypeScript + Vite)

A searchable, filterable internship board built for the Neurofinve Week 1 task. Data comes from `public/mock-data.json` via `fetch`, with a simulated 900 ms delay and a ~25% simulated failure rate so loading and error states are exercised for real. Submissions are stored in React state only (no backend).

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (strict) + production build
npm run preview
```

Requires Node 18+.

## Features

- Home route `/`: cards with title, company, location, work mode and tags
- Debounced (300 ms) search by title/company
- Location and Category dropdowns, combined with search using AND logic
- Details route `/internships/:id` with the full posting and an Apply form
- Field-level validation (name, email format, cover note 30-500 chars) and a success confirmation
- Explicit loading, error (with retry), empty (with clear filters) and not-found states
- TypeScript `strict: true`, zero `any`

## Architecture note

### Component tree

```
main.tsx
└── BrowserRouter
    └── App                       (owns shared state: fetch state + applications)
        ├── Header                (props: applicationCount)
        └── Routes
            ├── "/"  HomePage     (owns search/filter state; props: state, onRetry)
            │   ├── SearchBar
            │   ├── FilterSelect x2
            │   ├── LoadingState / ErrorState / EmptyState
            │   └── InternshipCard (per item, key = id)
            │       └── Badge
            ├── "/internships/:id"  InternshipDetailsPage
            │   ├── Badge
            │   ├── LoadingState / ErrorState / EmptyState
            │   └── ApplyForm     (owns form values + errors)
            │       └── FormField x3
            └── "*"  EmptyState (404)
```

### Thinking in React decomposition

1. Mocked the UI: search bar, filters, list of cards, details page, form.
2. Identified components from visual boxes (Card, Badge, SearchBar, FilterSelect, FormField, ApplyForm, status messages).
3. Minimal state: fetch state, applications, search text, two filters, form values/errors. The filtered list and dropdown options are derived with `useMemo`, not stored.
4. State placement: the fetch state and applications are needed by both routes, so they live in `App` (nearest common parent). Search/filters are only needed by `HomePage`, so they live there. Props never travel more than 2 levels.

### useState vs useReducer

- `useReducer` for the fetch state in `useInternships`: loading, success and error are mutually exclusive transitions of one state machine. A reducer with a discriminated union makes invalid combinations impossible.
- `useState` for search, filters, form values and applications: they are independent, simple values with no multi-step transitions, so a reducer would add ceremony without benefit.

### Hook correctness

- `useEffect` in `useInternships` depends on `[attempt]`; it aborts the request in cleanup (no stale updates, safe under StrictMode).
- `useDebounce` cleans up its timer on each change.
- List keys use stable ids (never the array index).

## Folder structure

```
src/
  api/         fetchInternships.ts   (simulated delay + error)
  components/  Badge, FilterSelect, FormField, ApplyForm, Header, InternshipCard, SearchBar, StatusMessage
  hooks/       useDebounce, useInternships
  pages/       HomePage, InternshipDetailsPage
  types.ts
```
