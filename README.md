# SI-AKOOR

Sistem Informasi AKOOR.

## Stack

- React v19
- TypeScript
- React Router v8.4 (Framework Mode)
- Vite v8
- Tailwind CSS v4
- shadcn/ui, Lucide React
- Drizzle ORM with PostgreSQL
- Winston logger
- Zod validation
- Docker & Docker Compose (PostgreSQL 16 Alpine)

## Structure

```text
.
├── app/
│   ├── components/    # Reusable UI components & shadcn primitives
│   ├── constants/     # Application constants
│   ├── db/            # Database client, migrations, and schema
│   │   ├── migrations/    # Generated SQL migrations
│   │   ├── schema/        # Drizzle table schemas
│   │   └── index.server.ts # Drizzle database instance
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions (logger, cn helper, etc.)
│   ├── middleware/    # Server middlewares (request logger, auth, etc.)
│   ├── routes/        # React Router routes and pages
│   ├── schema/        # Zod validation schemas
│   ├── types/         # Shared TypeScript interfaces & types
│   ├── app.css        # Tailwind v4 styles & CSS variables
│   ├── root.tsx       # Root layout & HTML shell
│   └── routes.ts      # Route configuration
├── public/            # Static assets
├── compose.yaml       # Docker Compose with PostgreSQL 16 Alpine
├── Dockerfile         # Multi-stage production container
├── drizzle.config.ts  # Drizzle ORM configuration
├── Makefile           # Development command shortcuts
├── package.json       # Project dependencies & scripts
└── README.md
```

## Requirements

- Node.js 24.21 or newer
- npm
- Docker and Docker Compose (for PostgreSQL)
- GNU Make (optional)

## Usage

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Start the PostgreSQL database container:

   ```bash
   docker compose up -d postgres
   ```

3. Install dependencies and run development server:
   ```bash
   npm install
   npm run dev
   ```

Development server: `http://localhost:5173`

Run `make help` for all command shortcuts. Direct npm commands:

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
npm run format:check
npm run db:generate
npm run db:migrate          # Local migration (or: make db-migrate)
npm run db:migrate -- --ssh # Remote migration via SSH tunnel (or: make db-migrate ssh=true)
npm run db:studio
```
