# Agent Instructions

## Repository

- **Project:** `si-akoor` (Sistem Informasi Apel dan Koordinasi).
- **Architecture:** Full-stack React Router v8.4 in Framework Mode, powered by Vite v8, React 19, and Tailwind CSS v4.
- **Runtime:** Node.js `>=24.0.0` (Alpine container runtime: `node:24-alpine`).
- **Database:** PostgreSQL 16 (Alpine) via discrete credentials and Drizzle ORM (`postgres` driver).

---

## Directory Structure & Responsibilities

```text
.
├── app/
│   ├── components/
│   │   ├── home/              # Landing page sections & presentation widgets (hero, features, simulator, etc.)
│   │   ├── layout/            # Structural layout blocks (navbar, footer, sidebar, breadcrumbs)
│   │   ├── shared/            # Reusable UI components shared across 2+ routes
│   │   └── ui/                # shadcn/ui primitive components (button, sonner, dialog, input, etc.)
│   ├── constants/             # Static constants & datasets
│   ├── db/
│   │   ├── migrations/        # Generated SQL migrations and metadata snapshots
│   │   ├── schema/            # Drizzle table schema definitions (*.ts)
│   │   └── index.server.ts    # Drizzle client singleton with discrete credentials
│   ├── hooks/                 # Custom React client hooks (use-count-up.ts, use-reveal.ts)
│   ├── layouts/               # Route shell layouts with <Outlet /> (home-layout.tsx, etc.)
│   ├── lib/                   # Utility helpers (cn(), logger.server.ts, etc.)
│   ├── middleware/            # React Router 8 server middlewares (logger.server.ts, auth, etc.)
│   ├── routes/                # Route modules (loaders, actions, page components)
│   ├── schema/                # Zod validation schemas
│   ├── types/                 # Shared TypeScript interfaces & types
│   ├── app.css                # Tailwind CSS v4 imports, theme tokens & shadcn variables
│   ├── root.tsx               # Root document layout, HTML shell, and global middleware
│   └── routes.ts              # Route manifest & URL configuration
├── scripts/
│   ├── migrate.ts             # Programmatic migration runner (supports local & SSH tunnel)
│   └── tunnel.ts              # SSH port forwarding utility (ssh2)
├── compose.yaml               # Container configuration for PostgreSQL
├── Dockerfile                 # Multi-stage production container
├── drizzle.config.ts          # Drizzle Kit configuration (PostgreSQL dialect)
├── Makefile                   # Developer task automation
└── README.md                  # Project overview and run guides
```

---

## Rules of Thumb & Engineering Directives

### 1. Routing & Route Modules (React Router Framework Mode)

- Define all routes in [`app/routes.ts`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/routes.ts) using `@react-router/dev/routes` helpers (`index`, `route`, `layout`, `prefix`).
- Wrap route groups inside persistent layout shells using `layout()`:
  ```tsx
  layout('layouts/home-layout.tsx', [
    index('routes/home.tsx'),
    route('login', 'routes/login.tsx'),
  ]),
  ```
- Route files must live inside [`app/routes/`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/routes/).
- Route-level code splitting is **automatic**; do not wrap route modules with manual `React.lazy()`.
- Always import and type route functions using auto-generated types from `./+types/<route-filename>`:
  ```tsx
  import type { Route } from './+types/home';
  export const meta: Route.MetaFunction = () => [...];
  export async function loader({ request }: Route.LoaderArgs) { ... }
  export async function action({ request }: Route.ActionArgs) { ... }
  export default function Home({ loaderData }: Route.ComponentProps) { ... }
  ```
- Use React Router `<Link>` and `<NavLink>` for client-side navigation (e.g. `<Link to="/login">`). Use hash anchor links for in-page section scrolling (e.g. `<Link to="/#simulator">`).
- Use `useNavigation().state` in [`app/root.tsx`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/root.tsx) for page transition indicators.
- Use `HydrateFallback` for routes requiring client-side initialization skeletons.

### 2. Layout Architecture (`app/layouts/` vs `app/components/layout/`)

- **`app/layouts/` (Route Layout Shells)**:
  - Registered via `layout(...)` in `app/routes.ts`.
  - Must render React Router v8 `<Outlet />` to host active child routes.
  - Hosts persistent page chrome (`Navbar`, `Footer`) and global layout-level providers (such as Sonner's `<Toaster />`).
  - Example: [`app/layouts/home-layout.tsx`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/layouts/home-layout.tsx).
- **`app/components/layout/` (Structural Layout Blocks)**:
  - Reserved for reusable visual layout blocks: `Navbar`, `Footer`, `Sidebar`, `Breadcrumbs`.
  - Consumed by route layouts across the application.

### 3. Components Organization & shadcn/ui

- **`app/components/ui/`**: Reserved exclusively for shadcn/ui primitives (`Button`, `Sonner`, `Dialog`, `Input`, etc.).
  - Standard shadcn primitives use `React.forwardRef` and are excluded from React 19 ref refactorings.
  - When adapting styling, use the `cn()` utility (`app/lib/utils.ts`) at the component call site or configure custom primitive defaults.
  - **Never re-invent custom primitives** (like manual modal backdrops, dropdowns, accordions, or bespoke floating toast systems) when a shadcn component exists in `app/components/ui/`.
- **`app/components/<domain>/`**: Domain/page presentation widgets belong in domain folders (e.g., `app/components/home/` contains `hero-section.tsx`, `features-section.tsx`, `simulator-section.tsx`, `comparison-section.tsx`, `divisions-section.tsx`, `faq-section.tsx`, `cta-section.tsx`).
- **`app/components/shared/`**: Reusable custom components utilized by two or more distinct features/routes.
- **`app/types/` & `app/constants/`**: Keep data structures and static mock datasets centralized in dedicated domain files (e.g., `app/types/home.ts`, `app/constants/home.ts`). Do not mix static content inside route component files. **Exception**: If a constant contains Tailwind CSS classes (e.g., dynamic style tokens, badge classes, or height utilities), keep it co-located in the component to preserve Tailwind compiler class extraction.

### 4. Global Toast Notifications (Sonner)

- Standardized on **shadcn `sonner`** via `<Toaster position="bottom-right" richColors />` mounted once inside [`app/layouts/home-layout.tsx`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/layouts/home-layout.tsx).
- Never build custom floating toast containers or pass toast state down through prop drilling.
- Dispatch toast notifications imperatively from anywhere:
  ```typescript
  import { toast } from 'sonner';

  toast.success('Presensi Apel Berhasil!', {
    description: 'Lokasi Anda tercatat di radius Halaman Kantor DPRD Kab. Tapin.',
  });
  ```

### 5. Tailwind CSS v4 & Canonical Classes (`suggestCanonicalClasses`)

- **Strictly enforce canonical classes**: Never use arbitrary bracket classes when standard Tailwind v4 utilities or project tokens exist:
  - Use `min-h-dvh` instead of arbitrary `min-h-[100dvh]` or `min-h-screen`.
  - Use semantic theme tokens (`border-neutral-200`, `bg-neutral-900`) instead of raw hex values.
  - Use standard typography scales instead of arbitrary pixel values.
- Design tokens and shadcn custom properties are mapped in `:root` and `@theme inline` in [`app/app.css`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/app.css).

### 6. Avoid Barrel Files (`bundle-barrel-imports`)

- **Do not create single re-export `index.ts` files** (e.g. `app/middleware/index.ts` or `app/db/schema/index.ts`).
- Consumers must import directly from module files:
  - `import { requestLogger } from '@/middleware/logger.server';`
  - `import { users } from '~/db/schema/schema';`
  - `import * as schema from './schema/schema';`
- This ensures maximum tree-shaking efficiency and avoids bundle bloat.

### 7. JSX & Conditional Rendering (`rendering-conditional-render`)

- Never use `&&` for conditional JSX rendering when the condition can be a number, string, or falsy primitive (`{count && <Badge />}` can render `0`).
- Always use explicit ternary expressions:
  ```tsx
  {
    error ? <ErrorMessage message={error} /> : null;
  }
  {
    stack ? (
      <pre>
        <code>{stack}</code>
      </pre>
    ) : null;
  }
  ```

### 8. TypeScript Best Practices (`typescript-advanced-types`)

- Avoid double unsafe casting (`globalThis as unknown as { ... }`).
- For global singletons, use ambient declarations:
  ```typescript
  declare global {
    var __postgresClient: postgres.Sql | undefined;
  }
  ```
- Use type guards (`instanceof`, `typeof`, discriminated unions) instead of unchecked type assertions:
  ```typescript
  const status = response instanceof Response ? response.status : 200;
  ```
- **No deprecated `FormEvent` in React 19**: In React 19 (`@types/react`), `FormEvent` is deprecated because standard DOM has no generic "FormEvent". Never use `FormEvent` or `React.FormEvent`. Always use concrete event types matching the exact event target and action:
  - Form submission: `React.SubmitEvent<HTMLFormElement>` (or `SubmitEvent<HTMLFormElement>`)
  - Input changes: `React.ChangeEvent<HTMLInputElement>` (or `HTMLTextAreaElement`, `HTMLSelectElement`)
  - Text input events: `React.InputEvent<HTMLInputElement>`
  - Generic synthetic events: `React.SyntheticEvent<Element>`

### 9. Database & Drizzle ORM

- **No `DATABASE_URL`**: Never introduce monolithic connection strings. The project uses discrete environment variables:
  `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_HOST_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
- Drizzle schemas live in [`app/db/schema/`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/db/schema/) and are registered directly with the client in [`app/db/index.server.ts`](file:///c:/Users/tnnz/Documents/projects/freelancer/si-akoor/app/db/index.server.ts).
- Migrations are generated into `app/db/migrations/` via `npm run db:generate` (`make db-generate`).
- Migrations support SSH tunneling for remote deployment:
  - Local migration: `make db-migrate` (or `npm run db:migrate`)
  - Remote migration over SSH: `make db-migrate ssh=true` (or `npm run db:migrate -- --ssh`)
  - SSH tunnel credentials use `SSH_*` and `SSH_POSTGRES_*` variables in `.env`.

### 10. Containerization & Compose

- Default container engine is **Podman**.
- `compose.yaml` services: `postgres` service on top attached to `si-akoor-net` network with persistent volume `postgres-data`.
- Makefile supports switching engine:
  - Default: `make compose-up` / `make compose-down` (executes `podman compose`)
  - Docker: `make compose-up engine=docker` / `make compose-down engine=docker` (executes `docker compose`)

### 11. Minimalism & YAGNI (`ponytail`)

- Follow the simplicity ladder:
  1. Does this need to exist? (Skip speculative code).
  2. Does an existing helper/type in this repo solve it?
  3. Does standard library or native platform solve it?
  4. Does an installed package solve it?
  5. Shortest diff wins.
- Do not create empty boilerplate, placeholder types, or unrequested scaffolding.

### 12. Git Commits (`caveman-commit`)

- Follow Conventional Commits format: `<type>(<scope>): <summary>`
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`.
- Imperative mood, ≤50-72 characters, no trailing period.
- No AI attribution, no filler. Body only for breaking changes or non-obvious rationale.

---

## Verification & Quality Gates

Before pushing code or claiming completion, execute all quality gates:

```bash
# 1. Format with Prettier
npm run format
npm run format:check

# 2. Lint with ESLint 9
npm run lint

# 3. Type check React Router types & TypeScript
npm run typecheck

# 4. Production build check
npm run build
```
