---
title: .Agents - Skills - Design System - Reference
type: document
status: active
description: Reference
---

# Design System Reference

Full token tables, decision trees, and cross-ADR details.
Source ADRs: `knowledge/design/` (25 active ADRs: 0017–0043, excluding deprecated 0016) + `knowledge/architecture/adr/0015-style-guide.md`.

---

## Spacing Tokens (ADR 0018)

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Inline gaps, icon padding |
| `space-2` | 8px | Tight component padding |
| `space-3` | 12px | Default component padding |
| `space-4` | 16px | Card inner padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Field group separation |
| `space-12` | 48px | Page section breaks |

**Content width constraints:**
- Text: 65–75 chars/line
- Forms: max 640px
- Standard dashboards: max 1280px
- Data-dense (financial tables, territory maps): max 1600px (`max-w-7xl`)

**Border radius tokens:** derived from 8–12px base → `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-full`

---

## Typography Scale (ADR 0019)

| Step | Size | Weight use |
|---|---|---|
| `xs` | 12px | Metadata, captions |
| `sm` | 14px | Secondary labels |
| `base` | 16px | Body copy (line-height 140–160%) |
| `lg` | 18px | Emphasized body |
| `xl` | 20px | Section headings |
| `2xl` | 24px | Page headings (dashboard max) |

**Weights:** 400 body · 500 labels · 600 headings · 700 hero/CTA only

**Beyond 24px (marketing only):** letter-spacing −2%/−3%, line-height 110–120%

---

## Color Architecture (ADR 0020)

```
3 seed colors (primary, accent, neutral)
  └─ OKLCH lightness stepping
      ├─ -100 light shade
      ├─ -200 mid shade
      └─ -300 dark shade

Tier 1 (primitives):  --primary-100, --primary-200, --primary-300, etc.
Tier 2 (semantic):    --primary, --background, --border, --foreground, etc.

Components consume ONLY Tier 2 tokens.
```

**Neutral foundation:**
- 3 background layers (page, card, surface)
- 2 structural strokes
- 3 text contrast tiers

**Status palette (independent of seeds):**
- Success: green + foreground
- Warning: amber + foreground
- Destructive: red + foreground
- Info: blue + foreground

**Third-party colors:** namespaced `--color-google-*`, never theme-overridden, runtime luminance for foreground.

---

## Icon Sizes & Optical Weights (ADR 0021)

| Tier | Size | Optical Stroke | Context | Mobile Target |
|---|---|---|---|---|
| Inline | 16px | `strokeWidth={2}` | Inline with text | N/A (static) |
| Action | 20px | `strokeWidth={2}` | Buttons, form inputs | 44×44px wrapper |
| Navigation | 24px | `strokeWidth={1.75}` | Sidebar, toolbar, top nav | 44×44px wrapper |
| Feature | 32px | `strokeWidth={1.5}` | Feature tiles, card headers | N/A |
| Hero | 48px | `strokeWidth={1.5}` | Empty states, onboarding | N/A |

**Touch Target Rule:** All interactive icons on touch viewports (`<768px`) must hit a minimum 44×44px bounding box (`size-11` or `before:-inset-1`).
**Avatar sizes:** 24 / 32 / 40 / 48px — circular — fallback: uploaded → initials → generic icon

---

## Z-Index Scale (ADR 0017)

| Layer | Value |
|---|---|
| Base | 0 |
| Dropdowns | 40 |
| Sticky | 50 |
| FABs | 60 |
| Drawers | 70 |
| Modals | 80 |
| Toasts | 100 |

---

## Shadow / Elevation Tiers (ADR 0041)

| Token | Box Shadow Spec | Use |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Resting cards |
| `shadow-sm` | `0 1px 3px 0 + 0 1px 2px -1px` | Raised / hover state |
| `shadow-md` | `0 4px 6px -1px + 0 2px 4px -2px` | Floating / dropdowns |
| `shadow-lg` | `0 10px 15px -3px + 0 4px 6px -4px` | Overlay / modal |
| `shadow-xl` | `0 20px 25px -5px + 0 8px 10px -6px` | Top-level / toast |

**Dark mode:** reduce shadow opacity + add subtle border or background lightening.
**Modal backdrop:** `backdrop-filter: blur(4px)`; light `rgba(0,0,0,0.5)` / dark `rgba(0,0,0,0.7)`.
**Layering rule:** Higher-elevation elements always cast larger shadows. Shadowless elements must not appear above shadowed elements.

**Source:** [ADR 0041 - Elevation & Surface Tier System](../../../knowledge/design/0041-surface-tier-system.md) — also defines `surface` prop (`raised`/`flat`/`flush`/`inset`) on `ContainerPanel` and `Card`.

---

## Breakpoints (ADR 0024)

| Token | Min width | Adaptation |
|---|---|---|
| (base) | 0 | Mobile — single column |
| `sm` | 640px | Minor layout unlocks |
| `md` | 768px | Tables→cards; multi-col forms→single; nav→hamburger |
| `lg` | 1024px | Side panels expand; 2-col layouts |
| `xl` | 1280px | Full dashboard grids |

---

## Animation Durations (ADR 0022)

| Tier | Duration | Use |
|---|---|---|
| Micro | 100ms | State toggles, checkboxes |
| Standard | 200ms | Hover effects, dropdowns |
| Emphasis | 300ms | Panels, modals entering |
| Complex | 500ms | Page transitions, data reveals |

**Easing defaults:**
- Entering: `ease-out`
- Leaving: `ease-in`
- Repositioning: `ease-in-out`
- Default curve: `cubic-bezier(0.4, 0, 0.2, 1)`
- `linear` is **banned**.

**Async state requirements (every data-fetching component):**
1. **Empty** — illustrated CTA (not blank)
2. **Loading** — skeleton shimmer (not spinner)
3. **Error** — contextual message + retry action
4. **Partial/Degraded** — show succeeded, inline error for failed

**Optimistic UI exclusions:** financial data, access control, third-party writes → must await confirmation.

---

## Theming — Required Token Categories (ADR 0028)

Every theme must define:
- 3 background tiers
- 3 text tiers
- primary / secondary / accent + foregrounds
- 4 semantic status colors + foregrounds
- border / input / ring
- 5 chart colors

**Dark mode validation rules:**
- ≥4% OKLCH lightness delta between page and card backgrounds
- Borders shift to lightened strokes
- Images dimmed 10–15% or desaturated
- Semantic colors shift hue/saturation, never functional meaning
- Manual override (light/dark/system) persisted in `localStorage`; default = `prefers-color-scheme`

---

## Forms Quick Rules (ADR 0025)

| Rule | Detail |
|---|---|
| Input height | 36–40px (text/select); textarea min 80px |
| Labels | Always above — never placeholder-only |
| Validation trigger | Text inputs: on blur · Selects/toggles: on change |
| Error state | Red border + ✕ icon + message below |
| Warning state | Amber + ⚠ icon + message below |
| Success state | Green + ✓ icon + message below |
| Required indicator | `*` in destructive color beside label |
| Optional grouping | Label group "Optional." explicitly |
| Field grouping | `<fieldset>` / `<legend>`; separated by `space-8` (32px) |
| Multi-step | Stepper showing current/total/completed; back nav without data loss |

---

## Data Visualization Rules (ADR 0026)

- Chart palette: 5–8 colors, ≥30° OKLCH hue separation, WCAG AA contrast
- Mandatory: title, labeled axes with units, legend (multi-series), readable gridlines
- Tooltips: hover desktop / tap mobile; show value + series + unit; follow cursor
- Below `md`: simplify to key metrics or tabular summary; legend below chart; min height 200px
- Every chart must have a tabular data alternative for screen readers

---

## Accessibility Checklist (ADR 0023)

- [ ] WCAG 2.1 Level AA minimum
- [ ] `:focus-visible` 2px ring — never suppressed
- [ ] Focus trapped inside modals; returned to trigger on close
- [ ] Skip-navigation link on every page
- [ ] One `<h1>` per page; no skipped heading levels
- [ ] `<nav>`, `<main>`, `<aside>` over `<div>` where semantic
- [ ] Status indicators use icon/text in addition to color
- [ ] 44×44px minimum touch targets
- [ ] `aria-hidden` on decorative images
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-live` regions for dynamic updates
- [ ] `prefers-reduced-motion`: instant state changes, opacity-only transitions

---

## Sidebar Specification (ADR 0017)

| State | Width | Behavior |
|---|---|---|
| Collapsed | 64px | Icon-only |
| Expanded | 240–280px | Label + icon |
| Mobile | full-screen | Drawer overlay |

- 5–9 top-level items max
- Low-frequency actions (profile, settings, billing) → header profile menu

---

## Mobile Bottom Action Paradigm (ADR 0041)

### Application Paradigm Evaluation Decision Tree
```
Evaluate App-Wide Action Needs:
  ├─► Does app require 2–3 contextual actions per view on average?
  │   (Search/Filter + Primary Action + Voice/AI Assistant)
  │   └─► SELECT STICKY FOOTER PARADIGM (App-Wide)
  │       • 1–3 slot layout flexibility per page
  │       • Deprecate mobile floating FABs
  │       • Safe-area inset + scroll buffer
  │
  └─► Does app require strictly 1 floating action across all views?
      └─► SELECT FAB PARADIGM (App-Wide)
          • Single persistent floating button
          • Safe-area inset offset
```

### Sticky Footer Slot Contract (1–3 Slots)
- **1-Slot**: Full-width primary CTA (`Save Changes`, `Submit`)
- **2-Slot**: Left: Context/Secondary action · Right: Primary CTA (`Call` / `Log Note`)
- **3-Slot**: Left: Search/Filter · Center: Primary CTA (`+ New [Entity]`) · Right: Assistant/Voice trigger (`Mog`)

### Mandatory Bottom Scroll Buffer Rule
- Page container: `pb-[calc(var(--sticky-footer-height,4rem)+env(safe-area-inset-bottom,0px))] md:pb-0`

---

## ADR Cross-Reference (all 25 active ADRs)

| ADR | Title | Location | Key constraint |
|---|---|---|---|
| 0015 | Style Guide | `knowledge/architecture/adr/` | `camelCase` in code; `Title Case` in UI |
| 0017 | Layout & Structure | `knowledge/design/` | F-pattern, z-index scale, sidebar spec |
| 0018 | Spacing & Scaling | `knowledge/design/` | 4px grid, 7 tokens, content width caps |
| 0019 | Typography | `knowledge/design/` | 6-step scale, 4 weights, 2 families, max 24px in app |
| 0020 | Color System | `knowledge/design/` | OKLCH, 3-seed, Tier 2 only, chart hue stepping |
| 0021 | Iconography & Imagery | `knowledge/design/` | Lucide, 5-tier sizes, avatar immutable container |
| 0022 | Animations, Motion & Transitions | `knowledge/design/` | No linear, 200–500ms, 3 tooltip tiers, route/section patterns |
| 0023 | Accessibility | `knowledge/design/` | WCAG 2.1 AA, focus, keyboard, ARIA, 44px touch targets |
| 0024 | Responsive Layout | `knowledge/design/` | Mobile-first, 4 breakpoints, component adaptation |
| 0025 | Forms & Inputs | `knowledge/design/` | Labels above, blur validation, fieldset grouping, AI patterns |
| 0026 | Data Visualization | `knowledge/design/` | Labeled axes, tabular alt, OKLCH palette (→ADR 0020 §6) |
| 0028 | Theming & Dark Mode | `knowledge/design/` | Complete token contract, ≥4% dark delta, localStorage override |
| 0029 | Button Hierarchy & States | `knowledge/design/` | Variant decision rule, text-slide exception, keyboard focus |
| 0030 | Content Formatting | `knowledge/design/` | Dates, currency, numbers, unknowns (`—`) |
| 0031 | UX Copy & Microcopy | `knowledge/design/` | Tone, verb-first button labels, error structure, empty states |
| 0032 | Modal & Dialog Standards | `knowledge/design/` | AlertDialog vs Dialog vs Sheet, size tiers, anatomy |
| 0033 | Toast & Notification Rules | `knowledge/design/` | Dismiss durations, max 3 concurrent, toast vs. bell boundary |
| 0034 | Table Design Standards | `knowledge/design/` | Structural cleanliness, Concept C/A, numeric alignment, density |
| 0035 | Badge / Status Indicator Ban | `knowledge/design/` | Total ban on badge.tsx/dots/pills; Concept C/A replacements |
| 0036 | Semantic Color at Rest & Destructive Confirmation | `knowledge/design/` | Zero semantic color at rest, menu gating, AlertDialog anatomy |
| 0037 | Navigation Header Bar | `knowledge/design/` | 3-zone layout, frosted glass, breadcrumb placement |
| 0039 | Page Toolbar & Section Header | `knowledge/design/` | 52px single-row toolbar across viewports, 7-stage dynamic priority collapse, persistent `MoreVertical` anchor, 200–300ms tooltip tier |
| 0040 | Split Pane Detail Cards | `knowledge/design/` | DynamicInspector CSS Grid, priority rankings |
| 0041 | Elevation & Surface Tier System | `knowledge/design/` | 5-tier shadow scale, `surface` prop, modal backdrop, ContainerPanel |
| 0042 | Multi-Step Wizards & Workflows | `knowledge/design/` | Facebook 3-zone layout, draft auto-save, click-to-validate Next button, accordion review |
| 0043 | Button Text vs Icon Rules | `knowledge/design/` | Transient vs persistent surface rules; persistent utilities are icon-only; Primary CTA is Icon + Text |
| 0041 | Mobile Bottom Actions | Single paradigm per app, 1–3 slot layout contract, safe-area bottom scroll buffer |
