---
title: Design Guidelines Reference
type: reference
status: active
description: >
last_updated: 2026-08-15
---

# Design Guidelines Reference

## Spacing Tokens

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
- Data-dense layouts: max 1600px

**Border radius tokens:** `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-full`

---

## Typography Scale

| Step | Size | Weight use |
|---|---|---|
| `xs` | 12px | Metadata, captions |
| `sm` | 14px | Secondary labels |
| `base` | 16px | Body copy (line-height 140–160%) |
| `lg` | 18px | Emphasized body |
| `xl` | 20px | Section headings |
| `2xl` | 24px | Page headings |

**Weights:** 400 body · 500 labels · 600 headings · 700 hero/CTA only
**App UI cap:** 24px. Larger sizes are for marketing only.

---

## Color Architecture

```
3 seed colors (primary, accent, neutral)
  └─ Lightness stepping
      ├─ light shade
      ├─ mid shade
      └─ dark shade

Primitives:  --primary-100, --primary-200, --primary-300, etc.
Semantic:    --primary, --background, --border, --foreground, etc.

Components consume ONLY semantic tokens.
```

**Neutral foundation:**
- 3 background layers
- 2 structural strokes
- 3 text contrast tiers

**Status palette:** success, warning, destructive, info — each with matching foreground.

**Dark mode validation:**
- Minimum lightness delta between adjacent background layers
- Borders shift to lightened strokes
- Manual override persisted; default = system preference

---

## Icon Sizes & Optical Weights

| Tier | Size | Stroke | Context |
|---|---|---|---|
| Inline | 16px | 2 | Inline with text |
| Action | 20px | 2 | Buttons, form inputs |
| Navigation | 24px | 1.75 | Sidebar, toolbar, top nav |
| Feature | 32px | 1.5 | Feature tiles, card headers |
| Hero | 48px | 1.5 | Empty states, onboarding |

**Touch target rule:** interactive icons on touch viewports need a minimum 44×44px bounding box.
**Avatar sizes:** 24 / 32 / 40 / 48px — circular.

---

## Z-Index Scale

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

## Shadow / Elevation Tiers

| Token | Box Shadow Spec | Use |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Resting cards |
| `shadow-sm` | `0 1px 3px 0 + 0 1px 2px -1px` | Raised / hover |
| `shadow-md` | `0 4px 6px -1px + 0 2px 4px -2px` | Floating / dropdowns |
| `shadow-lg` | `0 10px 15px -3px + 0 4px 6px -4px` | Overlay / modal |
| `shadow-xl` | `0 20px 25px -5px + 0 8px 10px -6px` | Top-level / toast |

Higher-elevation elements always cast larger shadows. Shadowless elements must not appear above shadowed elements.

---

## Breakpoints

| Token | Min width | Adaptation |
|---|---|---|
| base | 0 | Mobile — single column |
| `sm` | 640px | Minor layout unlocks |
| `md` | 768px | Tables→cards; multi-col forms→single |
| `lg` | 1024px | Side panels expand; 2-col layouts |
| `xl` | 1280px | Full dashboard grids |

---

## Animation Durations

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
- `linear` is banned.

**Async state requirements (every data-fetching component):**
1. Empty — illustrated CTA
2. Loading — skeleton shimmer
3. Error — contextual message + retry
4. Partial/Degraded — show succeeded, inline error for failed

---

## Theming — Required Token Categories

Every theme must define:
- 3 background tiers
- 3 text tiers
- primary / secondary / accent + foregrounds
- 4 semantic status colors + foregrounds
- border / input / ring
- chart colors

**Dark mode validation:**
- Minimum lightness delta between adjacent backgrounds
- Borders shift to lightened strokes
- Images dimmed or desaturated
- Manual override persisted; default = system preference

---

## Forms Quick Rules

| Rule | Detail |
|---|---|
| Input height | 36–40px; textarea min 80px |
| Labels | Always above — never placeholder-only |
| Validation trigger | Text inputs: on blur · Selects/toggles: on change |
| Required indicator | beside label |
| Field grouping | group related fields; separate groups clearly |
| Multi-step | stepper showing current/total/completed |

---

## Data Visualization Rules

- Chart palette: accessible colors with sufficient separation
- Mandatory: title, labeled axes with units, legend when multi-series
- Tooltips: hover/tap; show value + series + unit
- Simplify on small screens
- Every chart needs a tabular alternative for screen readers

---

## Accessibility Checklist

- [ ] WCAG 2.1 Level AA minimum
- [ ] `:focus-visible` ring — never suppressed
- [ ] Focus trapped inside modals; returned to trigger on close
- [ ] Skip-navigation link on every page
- [ ] One `<h1>` per page
- [ ] Semantic landmarks (`<nav>`, `<main>`, `<aside>`) over generic divs where appropriate
- [ ] Status indicators use icon/text in addition to color
- [ ] 44×44px minimum touch targets
- [ ] `aria-hidden` on decorative images
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-live` regions for dynamic updates
- [ ] `prefers-reduced-motion`: instant state changes, opacity-only transitions

---

## Toolbar / Header Principles

- Toolbar: max height across viewports; single-row layout preferred; persistent overflow anchor; tooltip delay tier; max 1 primary action
- Header: limited zones; fixed height; no nav links inside header
- Persistent-surface utilities are icon-only; transient-surface buttons require text or icon+text

---

## Surface & Elevation

- Use a defined shadow scale for depth
- Layout/card primitives expose a `surface` prop or equivalent when available
- Layering rule: higher-elevation elements cast larger shadows than lower ones

---

## Mobile Bottom Actions

- Single app-wide action paradigm
- 1–3 slot contract when a bottom action bar is used
- Safe-area scroll buffer on page containers

---

## Scrollbar Auto-Hide

- Hidden at rest
- Visible on active scroll
- Fade after idle timer
- Zero-width overlay when hidden

---

## Decision Trees

### Dialog type for an action
```
Evaluate risk and persistence:
  ├─► Destructive / high-stakes / permanent?
  │   └─► Use alert-style dialog; require explicit confirm
  ├─► Contextual side panel?
  │   └─► Use sheet/side panel when supported
  └─► Standard form or informational?
      └─► Use standard dialog
```

### Button text vs icon
```
Evaluate surface persistence:
  ├─► Persistent surface?
  │   ├─► Utilities are icon-only with tooltip/aria-label
  │   └─► Max 1 primary CTA, and it is icon+text
  └─► Transient surface?
      └─► Buttons are text or icon+text
```

### Missing value display
Use an em-dash. Never use N/A, null, -, or blank.

---

## Source Reference Map

| Topic | Reference |
|---|---|
| Spacing | ADR 0018 |
| Typography | ADR 0019 |
| Color | ADR 0020 |
| Icons | ADR 0021 |
| Animation | ADR 0022 |
| Accessibility | ADR 0023 |
| Responsive | ADR 0024 |
| Forms | ADR 0025 |
| Data Viz | ADR 0026 |
| Theming | ADR 0028 |
| Buttons | ADR 0029 |
| Content Format | ADR 0030 |
| Copy | ADR 0031 |
| Modals | ADR 0032 |
| Toasts | ADR 0033 |
| Tables | ADR 0034 |
| Badge Ban | ADR 0035 |
| Semantic Color at Rest | ADR 0036 |
| Header | ADR 0037 |
| Toolbar | ADR 0039 |
| Split Pane | ADR 0040 |
| Surface Tier | ADR 0041 |
| Mobile Bottom Actions | ADR 0041 mobile |
| Wizards | ADR 0042 |
| Button Text vs Icon | ADR 0043 |
| Scrollbar Auto-Hide | ADR 0044 |
