# Code Review Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address PR #1 review findings by eliminating duplicates, fixing accessibility contradictions, unifying navigation with React Router client-side links, adding timer cleanup, and setting document language, while preserving all shadcn primitives and agent skills.

**Architecture:** Refactor existing presentation components, navigation constants, and lifecycle hooks cleanly within React Router v8 Framework Mode and Tailwind CSS v4 without changing user-facing functionality or touching backend/DB code.

**Tech Stack:** React 19, React Router v8.4, Tailwind CSS v4, shadcn/ui primitives.

**Spec:** PR #1 Code Review Audit ([PR #1 Comment](https://github.com/tnnz20/si-akoor/pull/1#issuecomment-5970673413))

## Global Constraints

- **DO NOT REMOVE ANY SHADCN PRIMITIVES** in `app/components/ui/` (e.g. `dialog.tsx`, `accordion.tsx`, etc. must remain untouched).
- **DO NOT REMOVE ANY SKILLS OR CONFIGURATIONS** in `.agents/skills/` or `skills-lock.json`.
- Enforce `AGENTS.md` rules: no barrel files (`index.ts` re-exports), no deprecated `FormEvent`, canonical Tailwind v4 utilities, explicit ternaries for conditional rendering.
- All quality gates (`npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`) must pass with 0 errors and 0 warnings.

## Review Focus

1. **Document Language:** Ensure `<html lang="id">` is explicitly set in `app/root.tsx`.
2. **Accessibility Sanity:** Ensure conflicting `sr-only` and `aria-hidden="true"` combination is removed from `hero-section.tsx`.
3. **Single Source of Truth Navigation:** Ensure Navbar items map dynamically from `TOP_NAV_LINKS` and use React Router `<Link>` instead of raw `<a href>` to prevent page reloads.
4. **Memory Leak Prevention:** Ensure all simulation timers in `login.tsx` and `simulator-section.tsx` are cleaned up on component unmount.
5. **Component Primitives Consistency:** Ensure `AGENDA_AVATARS` in `hero-section.tsx` use the shadcn `Avatar` primitive rather than native `<img>`.

---

### Task 1: Update Document Language in Root Document

**Files:**

- Modify: `app/root.tsx:32-35`

**Interfaces:**

- Consumes: Standard React Router `Layout` component in `app/root.tsx`
- Produces: Correct `id` language attribute for accessibility and SEO

- [ ] **Step 1: Update `html` tag language attribute**

In `app/root.tsx`, change `<html lang="en">` to `<html lang="id">`:

```tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
```

- [ ] **Step 2: Verify type check passes**

Run: `npm run typecheck`
Expected: PASS with 0 errors

- [ ] **Step 3: Commit**

```bash
git add app/root.tsx
git commit -m "fix(root): set document language to id for accessibility"
```

---

### Task 2: Centralize Contact Constants & Deduplicate Copy Logic

**Files:**

- Modify: `app/constants/home.ts`
- Modify: `app/components/home/hero-section.tsx`
- Modify: `app/components/home/cta-section.tsx`

**Interfaces:**

- Consumes: `CONTACT_INFO` from `app/constants/home.ts`
- Produces: Centralized contact metadata and consistent clipboard interaction

- [ ] **Step 1: Add `CONTACT_INFO` to `app/constants/home.ts`**

Export `CONTACT_INFO` at the bottom of `app/constants/home.ts`:

```typescript
export const CONTACT_INFO = {
  email: 'setwan@tapinkab.go.id',
  division: 'Bagian Umum & Kepegawaian',
  address: 'Jl. Brigjend H. Hasan Basry No. 01, Rantau, Kab. Tapin',
  fullText: 'Sekretariat DPRD Kab. Tapin: setwan@tapinkab.go.id | Bagian Umum & Kepegawaian',
} as const;
```

- [ ] **Step 2: Refactor `hero-section.tsx` to use `CONTACT_INFO`**

Import `CONTACT_INFO` from `~/constants/home` and update `handleCopyContact`:

```typescript
import {
  AGENDA_AVATARS,
  CHAT_AVATARS,
  CONTACT_INFO,
  INITIAL_MESSAGES,
  MOCKUP_TABS,
  type MockupTab,
  TAB_HEADINGS,
  TASK_AVATARS,
} from '~/constants/home';
```

In `handleCopyContact`:

```typescript
const handleCopyContact = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(CONTACT_INFO.fullText);
  }
  toast.success('Kontak disalin ke clipboard!', {
    description: `Sekretariat DPRD Kab. Tapin: ${CONTACT_INFO.email}`,
  });
};
```

- [ ] **Step 3: Refactor `cta-section.tsx` to use `CONTACT_INFO`**

Import `CONTACT_INFO` from `~/constants/home` and update `handleCopyContact`:

```typescript
import { CONTACT_INFO } from '~/constants/home';
```

In `handleCopyContact`:

```typescript
const handleCopyContact = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(CONTACT_INFO.fullText);
  }
  toast.success('Kontak disalin ke clipboard!', {
    description: `Sekretariat DPRD Kab. Tapin: ${CONTACT_INFO.email}`,
  });
};
```

- [ ] **Step 4: Verify formatting & type check**

Run: `npm run typecheck`
Expected: PASS with 0 errors

- [ ] **Step 5: Commit**

```bash
git add app/constants/home.ts app/components/home/hero-section.tsx app/components/home/cta-section.tsx
git commit -m "refactor(home): centralize contact information and deduplicate copy handler"
```

---

### Task 3: Clean Up `HeroSection` Redundant Prop, Accessibility Conflict, and Agenda Avatars

**Files:**

- Modify: `app/types/home.ts:9-12`
- Modify: `app/components/home/hero-section.tsx`
- Modify: `app/routes/home.tsx:26-28`

**Interfaces:**

- Consumes: `HeroSectionProps` with only `{ onCheckin: () => void }`
- Produces: Clean props contract, conflict-free accessibility markup, and shadcn `Avatar` usage

- [ ] **Step 1: Update `HeroSectionProps` in `app/types/home.ts`**

Update `HeroSectionProps` to remove the redundant `statHadir` prop:

```typescript
export interface HeroSectionProps {
  onCheckin: () => void;
}
```

- [ ] **Step 2: Update `HeroSection` in `app/components/home/hero-section.tsx`**

1. Change component signature to:

```typescript
export function HeroSection({ onCheckin }: HeroSectionProps) {
```

2. Remove the contradictory `<span className="sr-only" aria-hidden="true">{statHadir}</span>` element at the bottom of the section.

3. Replace native `<img>` in `AGENDA_AVATARS` (around lines 550-560) with the shadcn `Avatar` primitive:

```tsx
<div className="flex -space-x-1.5">
  {AGENDA_AVATARS.map((src, i) => (
    <Avatar key={src} className="h-5 w-5 border border-white">
      <AvatarImage src={src} alt={`Staf ${i + 1}`} />
      <AvatarFallback className="text-[7px]">S{i + 1}</AvatarFallback>
    </Avatar>
  ))}
</div>
```

- [ ] **Step 3: Update `HeroSection` usage in `app/routes/home.tsx`**

In `app/routes/home.tsx`, change:

```tsx
<HeroSection onCheckin={() => setStatHadir((n) => n + 1)} />
```

(removing `statHadir={statHadir}`)

- [ ] **Step 4: Run typecheck and lint**

Run: `npm run typecheck; npm run lint`
Expected: PASS with 0 errors and 0 warnings

- [ ] **Step 5: Commit**

```bash
git add app/types/home.ts app/components/home/hero-section.tsx app/routes/home.tsx
git commit -m "refactor(hero): remove redundant prop, resolve sr-only conflict, and use Avatar primitive"
```

---

### Task 4: Unify Navigation & Implement Client-Side Routing in Layout

**Files:**

- Modify: `app/constants/navigation.ts`
- Modify: `app/components/layout/navbar.tsx`
- Modify: `app/components/layout/footer.tsx`

**Interfaces:**

- Consumes: `NAV_LINKS` and `TOP_NAV_LINKS` from `app/constants/navigation.ts`
- Produces: Dynamic navbar links and client-side smooth transitions using React Router `<Link>`

- [ ] **Step 1: Add `TOP_NAV_LINKS` to `app/constants/navigation.ts`**

In `app/constants/navigation.ts`, add and export `TOP_NAV_LINKS`:

```typescript
import type { NavLinkItem } from '~/types/layout';

export const TOP_NAV_LINKS: NavLinkItem[] = [
  { label: 'Fitur', href: '/#fitur' },
  { label: 'Modul', href: '/#keunggulan' },
  { label: 'Pratinjau', href: '/#mockup-dashboard' },
  { label: 'Simulasi', href: '/#simulator' },
  { label: 'FAQ', href: '/#faq' },
];

export const NAV_LINKS: NavLinkItem[] = [
  ...TOP_NAV_LINKS,
  { label: 'Portal Pegawai', href: '/login' },
];
```

- [ ] **Step 2: Update `navbar.tsx` to map from `TOP_NAV_LINKS` using `<Link>`**

In `app/components/layout/navbar.tsx`:
Import `TOP_NAV_LINKS` from `~/constants/navigation`.
Replace the hardcoded `<a>` tags with:

```tsx
<div className="hidden shrink-0 items-center gap-5 text-sm font-medium text-neutral-600 sm:gap-6 md:flex lg:gap-7">
  {TOP_NAV_LINKS.map((item) => (
    <Link
      key={item.label}
      to={item.href}
      className="whitespace-nowrap transition-colors hover:text-neutral-900"
    >
      {item.label}
    </Link>
  ))}
</div>
```

- [ ] **Step 3: Update `footer.tsx` to use React Router `<Link>`**

In `app/components/layout/footer.tsx`:
Change the quiet links list to use `<Link>`:

```tsx
<nav
  aria-label="Tautan footer"
  className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-600"
>
  {NAV_LINKS.map((link) => (
    <Link
      key={link.label}
      to={link.href}
      className="transition-colors duration-150 hover:text-neutral-900"
    >
      {link.label}
    </Link>
  ))}
</nav>
```

- [ ] **Step 4: Run typecheck and lint**

Run: `npm run typecheck; npm run lint`
Expected: PASS with 0 errors and 0 warnings

- [ ] **Step 5: Commit**

```bash
git add app/constants/navigation.ts app/components/layout/navbar.tsx app/components/layout/footer.tsx
git commit -m "refactor(layout): unify navbar with navigation constants and use client-side links"
```

---

### Task 5: Add Timer Cleanup to Simulation Forms

**Files:**

- Modify: `app/routes/login.tsx`
- Modify: `app/components/home/simulator-section.tsx`

**Interfaces:**

- Consumes: React `useEffect` and `useRef` hooks
- Produces: Leak-free async prototype simulations that safely clean up timers on unmount

- [ ] **Step 1: Add timer cleanup in `login.tsx`**

In `app/routes/login.tsx`:
Import `useEffect` and `useRef`:

```typescript
import { useEffect, useRef, useState } from 'react';
```

Track timers and clear them on unmount:

```typescript
const timerIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

useEffect(() => {
  return () => {
    timerIdsRef.current.forEach(clearTimeout);
  };
}, []);

const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setFeedback(null);

  // Simulated login process with tracked timers
  const timer1 = setTimeout(() => {
    setIsLoading(false);
    setFeedback('Mengautentikasi kredensial pegawai ke server DPRD Tapin...');
    const timer2 = setTimeout(() => {
      setFeedback('Akses berhasil. Mengalihkan ke Dashboard Presensi...');
    }, 1000);
    timerIdsRef.current.push(timer2);
  }, 1200);
  timerIdsRef.current.push(timer1);
};
```

- [ ] **Step 2: Add timer cleanup in `simulator-section.tsx`**

In `app/components/home/simulator-section.tsx`:
Import `useEffect` and `useRef`:

```typescript
import { useEffect, useRef, useState } from 'react';
```

Track timers and clear on unmount:

```typescript
const timerIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

useEffect(() => {
  return () => {
    timerIdsRef.current.forEach(clearTimeout);
  };
}, []);

const handleRunSimulator = () => {
  if (simState === 'simulating') return;
  setSimState('simulating');

  const timer1 = setTimeout(() => {
    setSimState('verified');
    onVerified();
    toast.success('Presensi apel berhasil diverifikasi!', {
      description: 'Lokasi: Halaman Kantor DPRD Kab. Tapin (Radius valid)',
    });

    const timer2 = setTimeout(() => {
      setSimState('idle');
    }, 5000);
    timerIdsRef.current.push(timer2);
  }, 1600);
  timerIdsRef.current.push(timer1);
};
```

- [ ] **Step 3: Run typecheck and lint**

Run: `npm run typecheck; npm run lint`
Expected: PASS with 0 errors and 0 warnings

- [ ] **Step 4: Commit**

```bash
git add app/routes/login.tsx app/components/home/simulator-section.tsx
git commit -m "fix(forms): clear simulation timeouts on component unmount"
```

---

### Task 6: Execute Full Quality Gates & Final Verification

**Files:**

- Entire repository

**Interfaces:**

- Consumes: npm build and check scripts
- Produces: Production-ready clean build artifacts

- [ ] **Step 1: Run Prettier formatting check**

Run: `npm run format:check`
Expected: All matched files use Prettier code style!

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`
Expected: 0 errors, 0 warnings

- [ ] **Step 3: Run TypeScript Typecheck**

Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 4: Run Production Build**

Run: `npm run build`
Expected: Successfully generates client and SSR bundles with 0 build errors

- [ ] **Step 5: Verify Git status and branch cleanliness**

Run: `git status`
Expected: Clean working tree on `frontend/home`
