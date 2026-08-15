---
status: 
type: 
title: 
name: design-system
description: >
  Enforces The Bicycle Butler CRM design system (26 ADRs: 0015–0043) when writing or reviewing UI code.
  Covers: code casing, layout structure, spacing tokens, typography, color (OKLCH), icons/avatars,
  animations/async states, route/section transitions, accessibility, responsive breakpoints, forms,
  data viz, surface elevation/tiers, theming/dark mode, button hierarchy, content formatting,
  UX copy/microcopy, modal/dialog standards, toast/notification rules, table design,
  badge/status indicator ban, semantic-color-at-rest rule, navigation header, toolbar standards,
  split-pane detail layout, multi-step wizards.
  Use when building components, pages, or reviewing UI for style compliance, or when the user mentions
  design system, style guide, UI standards, component styling, dark mode, accessibility, responsive
  layout, button variants, error messages, empty states, tables, modals, toasts, or animations.
---

# Design System Skill

Read [REFERENCE.md](REFERENCE.md) for full token tables, decision trees, and ADR cross-reference.

## Quick Checklist (run before every UI commit)

- [ ] **Run Automated Audit:** `npm run audit:design` passes with 0 ERRORs and 0 WARNINGs
- [ ] All TS/Zod properties in `camelCase`; UI labels in `Title Case` (ADR 0015 — in `knowledge/architecture/adr/`)
- [ ] Layout follows F-pattern, sidebar spec, z-index scale (ADR 0017)
- [ ] Spacing uses only `space-1`…`space-12` tokens; no ad-hoc px (ADR 0018)
- [ ] Typography within 6-step scale & 4-weight hierarchy; cap at 24px for app UI (ADR 0019)
- [ ] Colors: only Tier 2 semantic tokens in components; zero static alert colors at rest (ADR 0020)
- [ ] Icons from Lucide only, sized to 5-tier scale; avatar container never mutated (ADR 0021)
- [ ] No linear easing; 200–500ms duration budget; tooltip delay tiers obeyed (ADR 0022)
- [ ] Every async op defines 4 states: Empty / Loading (skeleton, not spinner) / Error / Degraded (ADR 0022 §6)
- [ ] Route transition: `animate-in fade-in duration-200`; section mount: `slide-in-from-bottom-4 duration-300` (ADR 0022 §8–9)
- [ ] WCAG 2.1 AA, focus rings (`:focus-visible`), keyboard nav, semantic HTML, 44×44px touch targets (ADR 0023)
- [ ] Mobile-first, 4-breakpoint grid, tables→cards below `md`, safe-area inset bottom padding `pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]`, zero disabled sticky footer slots (ADR 0024 §5–6)
- [ ] Forms: labels above inputs, blur-triggered validation, required `*`, `<fieldset>` grouping (ADR 0025)
- [ ] Charts: labeled axes+units, OKLCH palette (→ADR 0020 §6), tabular alt, responsive reflow (ADR 0026)
- [ ] Themes supply complete token contract; dark mode lightness delta ≥4% (ADR 0028)
- [ ] Max 1 `default` button per surface; variant matches action type; loading = spinner + progressive label (ADR 0029)
- [ ] Button text pairing complies with transient vs persistent surface presence rules; Primary CTA in toolbars is Icon + Text (ADR 0043)
- [ ] Dates use relative/absolute rule; currency `$1,234.56`; unknowns = `—` (ADR 0030)
- [ ] Copy: verb-first labels, error = what+do, empty state = action invitation (ADR 0031)
- [ ] Dialog: `AlertDialog` for destructive/high-stakes; correct size tier; Cancel left (ADR 0032)
- [ ] Error toasts persist; success auto-dismiss 4s; max 3 concurrent; toast ≠ bell notification (ADR 0033)
- [ ] Table: text left-aligned, numeric right-aligned, Concept C sub-label stacking, no badge/dot/pill (ADR 0034)
- [ ] `badge.tsx`, colored dots, and pills are **completely banned**; Concept C or Concept A only (ADR 0035)
- [ ] **Zero semantic color at rest:** no `bg-destructive`, `bg-success`, `bg-warning`, `text-destructive` etc. on resting surfaces — only in toasts, open AlertDialogs, blur-triggered validation, or hover inside open overflow menus (ADR 0036 §1)
- [ ] Destructive entry points gated behind overflow menu (`ghost` trigger) or AlertDialog; no persistent red buttons (ADR 0036 §2)
- [ ] Header: 3 zones only (search / empty / utility+avatar); `h-16`; no nav links inside header (ADR 0037). Detail headers: mobile `< md` has zero nav buttons; desktop `≥ md` has zero prev/next chevrons, Back button inline left of title/avatar inside `PageToolbarLeft`.
- [ ] Toolbar: max 52px height across all viewports; zero scrollbars (`overflow-x-auto` & `overflow-y-auto` banned); strict single-row layout (multi-row wrapping eliminated); dynamic 7-stage priority collapse engine; persistent `MoreVertical` (`⋮`) anchor; icon-only borderless utility buttons; 200–300ms tooltip delay; max 1 primary CTA (ADR 0039 / ADR 0043)
- [ ] Surface options via `surface` prop on `ContainerPanel` or `Card` (`raised`, `flat`, `bordered`, `flush`, `inset`); content components are borderless by default in Jules CRM, using `shadow-xs`→`shadow-xl` 5-tier scale for depth (ADR 0041)
- [ ] Multi-step Wizard: 3-zone layout (tree sidebar / canvas / live preview), background draft auto-save, `Next` button never disabled (click-to-validate), accordion review step (ADR 0042)
- [ ] Mobile bottom actions follow app-wide paradigm (StickyFooter 1–3 slots, safe-area buffer `pb-24`, 0 FAB collisions) (ADR 0041)
- [ ] **Scrollbar Auto-Hide:** Scrollbars hidden at rest; visible strictly on active scroll; fade after 300ms idle timer; zero-width overlay layout (ADR 0044)


## Workflows

### 1 — Building a new component
1. Identify context: page, density tier, breakpoint targets.
2. Check spacing + layout rules → pick tokens from REFERENCE.md tables.
3. Apply color: Tier 2 tokens only. Zero semantic alert color at rest (ADR 0036 §1).
4. Set surface tier via `surface` prop on `ContainerPanel` or `Card` (ADR 0041).
5. Wire all 4 async states if component fetches data (skeleton-first loading).
6. Run accessibility checklist: focus, ARIA, keyboard, touch target.
7. Test dark mode: verify ≥4% lightness delta on adjacent surfaces.
8. **Run `npm run audit:design` to verify automated compliance.**

### 2 — Reviewing a PR for style compliance
1. Execute `npm run audit:design` on target files (`npm run audit:design src/path/to/feature`).
2. Scan for raw px/color literals → flag, replace with tokens.
3. Check z-index values against global scale (ADR 0017 §6).
4. Confirm all icons are Lucide at correct tier size.
5. Verify form validation timing (blur for text, change for selects).
6. Check `prefers-reduced-motion` guard on any animation.
7. Verify no semantic color class on resting surfaces (ADR 0036 §1).

### 3 — Adding a new theme
1. Supply all required token categories (ADR 0028 §2).
2. Run WCAG contrast check on every semantic pair.
3. Verify ≥4% OKLCH lightness delta between adjacent background layers.
4. Visual test on 3 representative pages (overview, detail, form).

## Query Mode (fast lookup — no full ADR read required)

| Question | Answer | Source |
|---|---|---|
| Shadow for a resting card? | `shadow-xs` | ADR 0041 §1 |
| Shadow for a dropdown? | `shadow-md` | ADR 0041 §1 |
| Shadow for a modal? | `shadow-lg` | ADR 0041 §1 |
| Shadow for a toast? | `shadow-xl` | ADR 0041 §1 |
| When can I show success/warning/destructive color? | Toast, open AlertDialog, blur-triggered validation, hover inside open overflow menu — never at rest | ADR 0036 §1 |
| Can I use `badge.tsx`? | No — fully deprecated. Use Concept C sub-label stacking | ADR 0035 |
| How do I show entity status or tier? | Concept C sub-label stacking (see ADR 0034 §2) | ADR 0035 §2 |
| Tooltip delay for a toolbar icon button? | 200–300ms | ADR 0022 §3 / ADR 0039 §3 |
| Tooltip delay for a standalone icon / avatar? | 1000ms | ADR 0022 §3 |
| Tooltip delay for a dropdown or popover? | 700–1000ms (tune within band) | ADR 0022 §3 |
| Is this a toast or a bell notification? | Current user triggered it → toast. Another actor triggered it → bell. | ADR 0033 §7 |
| Hard delete confirmation? | `AlertDialog`; `destructive` confirm button; `Enter` defaults to Cancel | ADR 0036 §4 / ADR 0029 §7 |
| Soft delete pattern? | Undo toast — no dialog | ADR 0036 §3 / ADR 0033 §3 |
| Easing curve for entering elements? | `ease-out`, `cubic-bezier(0.4, 0, 0.2, 1)` | ADR 0022 §1 |
| Route transition class? | `animate-in fade-in duration-200` on `<main>` | ADR 0022 §8 |
| Section mount class? | `animate-in fade-in slide-in-from-bottom-4 duration-300` | ADR 0022 §9 |
| Max stagger count? | 8 — items 9+ appear simultaneously | ADR 0022 §10 |
| Dialog vs Sheet vs AlertDialog? | AlertDialog = destructive/high-stakes; Sheet = contextual side panel; Dialog = standard | ADR 0032 |
| Button variant for overflow trigger? | `ghost` | ADR 0029 §1 / ADR 0036 §2 |
| Missing value display? | `—` (em-dash), never `N/A`, `null`, `-`, or blank | ADR 0030 |
| When should buttons be icon-only or have text? | Persistent surfaces: icon-only utilities (with tooltip/aria-label), except max 1 primary CTA which must be Icon + Text. Transient surfaces (forms/dialogs/modals): both primary and secondary buttons must have text or icon+text. | ADR 0043 |

## Key Rules (inline reference — all 26 ADRs)

| Domain | Rule | ADR |
|---|---|---|
| Casing | TS/Zod props = `camelCase`; UI display = `Title Case` | 0015 |
| Layout | F-pattern; sidebar 64px/240–280px; z-index Base→Toast (0/40/50/60/70/80/100) | 0017 |
| Spacing | 4px grid, 7 tokens (`space-1`=4px…`space-12`=48px), no ad-hoc values | 0018 |
| Typography | 2 families, 6-step scale (12–24px), 4 weights (400/500/600/700), max 24px in app | 0019 |
| Color | OKLCH, 3-seed derivation, Tier 2 tokens only in components | 0020 |
| Icons | Lucide only; 5 sizes: 16/20/24/32/48px; avatar immutable 1:1 container | 0021 |
| Animation | No linear easing; 200–500ms budget; 3 tooltip delay tiers; `prefers-reduced-motion` | 0022 |
| Transitions | Routes: `fade-in 200ms`; sections: `slide-in-from-bottom-4 300ms`; stagger ≤8 items | 0022 §8–13 |
| Accessibility | WCAG 2.1 AA; `:focus-visible` 2px ring; one `<h1>` per page; 44×44px touch targets | 0023 |
| Responsive | Mobile-first; 4 breakpoints sm/md/lg/xl; tables→cards below `md` | 0024 |
| Forms | Labels above inputs; 36–40px height; blur validation; `<fieldset>` grouping | 0025 |
| Data Viz | Labeled axes+units+legend; tabular alt; OKLCH 5–8 colors (→ADR 0020 §6) | 0026 |
| Theming | Complete token contract; system preference default; ≥4% dark lightness delta | 0028 |
| Buttons | 1 `default` per surface; `destructive` only in active confirm/hover state; loading = spinner | 0029 |
| Content Format | Relative time <7d; `$1,234.56` currency; `12.3%`; unknowns = `—` | 0030 |
| Copy | Verb-first labels; error = what+what-to-do; empty state = action invitation | 0031 |
| Modals | `AlertDialog` for destructive; sm/md/lg/xl size tiers; Cancel left, confirm right | 0032 |
| Toasts | Success 4s; error persistent; max 3 concurrent; undo toast for soft deletes | 0033 |
| Tables | Text left / numeric right; 44px rows; Concept C sub-labels; no badges/dots/pills | 0034 |
| Badge Ban | `badge.tsx`, dots, pills = **total ban** system-wide; Concept C (sub-label) or Concept A (margin wash) | 0035 |
| Semantic Color at Rest | Zero semantic alert color on resting surfaces; only in toasts/dialogs/validation/hover-open-menu | 0036 §1 |
| Destructive Actions | Overflow menu gating; `ghost` trigger; `AlertDialog` for hard delete confirmation | 0036 §2–4 |
| Header | 3 zones: search / empty / utility+avatar; `h-16`; frosted glass; no nav links | 0037 |
| Toolbar | 52px max height across viewports; strict single-row layout; 7-stage dynamic priority collapse; persistent `MoreVertical` anchor (`⋮`); icon-only borderless utilities; 200–300ms tooltip; Primary CTA is Icon + Text | 0039 / 0043 |
| Elevation | 5-tier shadow scale `shadow-xs`→`shadow-xl`; `ContainerPanel`/`Card surface` prop | 0041 |
| Multi-Step Wizard | Facebook 3-zone layout (tree sidebar / canvas / live preview), background draft auto-save, `Next` button never disabled, accordion review step | 0042 |
| Button Text vs Icon | Transient surface (modals/forms) buttons require text/icon+text. Persistent surface (toolbars) utilities are icon-only, primary CTA is icon+text. | 0043 |
| Mobile Bottom Actions | Single paradigm per app; StickyFooter 1–3 slots; safe-area `pb-[calc(4rem+env(safe-area-inset-bottom))]` | 0041 |
| Scrollbar Auto-Hide | Hidden at rest; visible on active scroll; 300ms idle persistence before 150ms fade out; zero-width overlay | ADR 0044 |

See [REFERENCE.md](REFERENCE.md) for full token tables, breakpoint decision tree, and color architecture.
