# Design System — Si Akoor (Sekretariat DPRD Kabupaten Tapin)

Locked design system for **Si Akoor** (_Sistem Informasi Apel & Koordinasi_). Subsequent agent sessions, pages, and components read this file first and defer to it. Amend intentionally — this file is the single source of truth for visual and structural hierarchy.

---

## 1. System Metadata

- **Entity**: Sekretariat DPRD Kabupaten Tapin (Pemerintah Kabupaten Tapin, Kalsel)
- **Genre**: `modern-minimal` with warm institutional cues (GovTech internal)
- **Macrostructure**: Bento Grid & Walkthrough Hybrid (`Bento Grid` + `Interactive Simulator` + `Ft1 Mast-headed`)
- **Theme**: Custom Warm Modern-Minimal (Canvas: Cream `#FAF7F2`, Accent: Amber `#F8BF43` + Indigo `#4F46E5`, Neutral: Slate `#161513`)
- **Tone**: Formal, trustworthy, highly functional, restrained, disciplined

---

## 2. Page & Component Archetypes

- **Navigation**: `N5 Floating pill` (`.glass-pill` backdrop blur 12px, centered floating capsule, image-only emblem, concise route links, auth button)
- **Hero**: Asymmetric Diptych with verified status badge, strong typography, real-time live device preview mockup, and primary CTA
- **Division Strip**: `T2 Logo wall / Balanced Pill Strip` (`BU`, `BP`, `BA`, `AKD`, `TPN` badges in `rounded-full` capsules with single-line labels)
- **Feature Matrix**: `F1 Bento Grid` (irregular spans, hairline border `border-neutral-200/80`, geofencing map card, biometric check, auto-rekapitulasi)
- **System Comparison**: `F3 Tabular spec / Contrast Card` (Manual attendance vs Si Akoor digital verification)
- **Interactive Simulator**: Embedded tactile widget (GPS coordinate lock, photo liveness simulation, verified attendance log)
- **Call-to-Action**: Statement Banner in dark slate (`bg-neutral-900`) with warm amber primary button
- **Footer**: `Ft1 Mast-headed` (Brand wordmark + honest tagline, horizontal link row, hairline divider, 1-click clipboard copy for address & email, back-to-top action)

---

## 3. Typography Stack

```css
/* Display & Body Font */
--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

/* Editorial Annotation Font (Hand-drawn badge / micro-notes) */
--font-hand: 'Caveat', cursive;

/* Data & Clock Font */
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Hierarchy & Scale

- **Display Hero**: `clamp(2.25rem, 5vw, 3.75rem)` · `font-extrabold` · `leading-tight` · `tracking-tight`
- **Section Heading**: `clamp(1.75rem, 3.5vw, 2.5rem)` · `font-extrabold` · `tracking-tight`
- **Card Title**: `1.125rem` – `1.25rem` · `font-bold`
- **Body Regular**: `0.875rem` – `1rem` · `leading-relaxed` · `text-neutral-600`
- **Microcopy / Badges**: `0.6875rem` – `0.75rem` · `font-semibold` / `font-bold` · `tracking-wider` · `uppercase`

---

## 4. Color Palette (OKLCH & Hex)

| Role                 | Token Name              | OKLCH / Value           | Hex Fallback | Usage                                              |
| -------------------- | ----------------------- | ----------------------- | ------------ | -------------------------------------------------- |
| **Canvas**           | `--color-paper`         | `oklch(0.985 0.006 85)` | `#FAF7F2`    | Warm cream page background                         |
| **Card / Surface**   | `--color-card`          | `oklch(1 0 0)`          | `#FFFFFF`    | Bento cards, pill surfaces, modal base             |
| **Dark Surface**     | `--color-dark`          | `oklch(0.18 0.01 60)`   | `#161513`    | Dark CTA card, logo badge, hero dark accents       |
| **Primary Ink**      | `--color-ink`           | `oklch(0.16 0.01 60)`   | `#171717`    | Headings, primary text                             |
| **Muted Ink**        | `--color-muted`         | `oklch(0.55 0.01 60)`   | `#737373`    | Subtitles, helper text, timestamps                 |
| **Border / Rule**    | `--color-rule`          | `oklch(0.92 0.005 85)`  | `#E5E5E5`    | Hairline dividers, card outlines                   |
| **Primary Accent**   | `--color-accent-amber`  | `oklch(0.82 0.16 80)`   | `#F8BF43`    | Primary action buttons, badges, morning apel glow  |
| **Secondary Accent** | `--color-accent-indigo` | `oklch(0.55 0.22 275)`  | `#4F46E5`    | System telemetry, geofencing radius, tech elements |
| **Success Status**   | `--color-status-green`  | `oklch(0.70 0.17 155)`  | `#10B981`    | Geofencing verified, attendance accepted           |

### Division Color Identity

- **BU (Bagian Umum & Keuangan)**: Emerald (`bg-emerald-100 text-emerald-800 border-emerald-200`)
- **BP (Bagian Persidangan & Hukum)**: Indigo (`bg-indigo-100 text-indigo-800 border-indigo-200`)
- **BA (Bagian Fasilitasi Penganggaran)**: Amber (`bg-amber-100 text-amber-800 border-amber-200`)
- **AKD (Alat Kelengkapan Dewan)**: Sky (`bg-sky-100 text-sky-800 border-sky-200`)
- **TPN (Pemerintah Kab. Tapin / BKPSDM)**: Rose (`bg-rose-100 text-rose-800 border-rose-200`)

---

## 5. Spacing, Borders & Radius Scale

- **Base Spacing**: 4-pt standard scale (`--space-3xs: 0.25rem` up to `--space-4xl: 8rem`)
- **Container**: Max width `80rem` (`max-w-7xl`) with responsive gutters (`px-4 sm:px-6 lg:px-8`)
- **Radius Scale**:
  - `rounded-full` (9999px): Nav capsule, division pills, action chips, status badges
  - `rounded-3xl` (24px–32px): Bento cards, CTA banner, modal windows
  - `rounded-2xl` (16px): Inner cards, preview windows, form inputs
  - `rounded-xl` (12px): Logos, micro-buttons, icon frames
- **Glassmorphism**:
  ```css
  .glass-pill {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(229, 229, 229, 0.8);
  }
  ```

---

## 6. Interaction & Motion Rules

1. **Restraint in Motion**:
   - No `transition: all` — specify transition properties explicitly (`transition-colors duration-150`, `transition-transform duration-200`).
   - Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Micro-lift on interactive cards: `hover:-translate-y-0.5`.
2. **Honest Copy & Data Integrity**:
   - Official office address: `Jl. Brigjend H. Hasan Basry No. 01, Rantau, Kab. Tapin, Kalsel 71111`.
   - Contact email: `setwan@tapinkab.go.id`.
   - Apel routine schedule: `07.30 WITA` on official working days.
3. **8-State Coverage**: All interactive inputs, buttons, and pills support `:hover`, `:focus-visible`, `:active`, and `disabled` states with immediate (0ms) focus outlines.

---

## 7. Exports

### A. Tailwind CSS v4 `@theme` (Native CSS)

```css
@theme inline {
  --color-paper: oklch(0.985 0.006 85);
  --color-paper-card: oklch(1 0 0);
  --color-paper-dark: oklch(0.18 0.01 60);
  --color-ink: oklch(0.16 0.01 60);
  --color-ink-muted: oklch(0.55 0.01 60);
  --color-rule: oklch(0.92 0.005 85);
  --color-accent-amber: oklch(0.82 0.16 80);
  --color-accent-indigo: oklch(0.55 0.22 275);
  --color-status-green: oklch(0.7 0.17 155);

  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-hand: 'Caveat', cursive;
  --font-mono: ui-monospace, monospace;

  --radius-pill: 9999px;
  --radius-card: 1.5rem;
  --radius-box: 1rem;
}
```

### B. shadcn/ui Design Tokens (HSL / OKLCH mapped)

```css
:root {
  --background: oklch(0.985 0.006 85);
  --foreground: oklch(0.16 0.01 60);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.16 0.01 60);
  --primary: oklch(0.18 0.01 60);
  --primary-foreground: oklch(0.985 0.006 85);
  --secondary: oklch(0.95 0.008 85);
  --secondary-foreground: oklch(0.18 0.01 60);
  --muted: oklch(0.95 0.008 85);
  --muted-foreground: oklch(0.55 0.01 60);
  --accent: oklch(0.82 0.16 80);
  --accent-foreground: oklch(0.18 0.01 60);
  --border: oklch(0.92 0.005 85);
  --input: oklch(0.92 0.005 85);
  --ring: oklch(0.55 0.22 275);
  --radius: 1rem;
}
```

### C. DTCG `tokens.json`

```json
{
  "color": {
    "paper": { "$value": "#FAF7F2", "$type": "color" },
    "card": { "$value": "#FFFFFF", "$type": "color" },
    "dark": { "$value": "#161513", "$type": "color" },
    "ink": { "$value": "#171717", "$type": "color" },
    "muted": { "$value": "#737373", "$type": "color" },
    "accentAmber": { "$value": "#F8BF43", "$type": "color" },
    "accentIndigo": { "$value": "#4F46E5", "$type": "color" },
    "statusGreen": { "$value": "#10B981", "$type": "color" }
  },
  "typography": {
    "fontSans": { "$value": "Plus Jakarta Sans, sans-serif", "$type": "fontFamily" },
    "fontHand": { "$value": "Caveat, cursive", "$type": "fontFamily" }
  }
}
```
