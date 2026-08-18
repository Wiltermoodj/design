---
title: Design Guidelines
type: overview
status: active
description: A codebase-agnostic skill for applying design guidelines across any UI project.
---

# Design Guidelines

A codebase-agnostic skill for applying design guidelines across any UI project.

- Installable via terminal
- Source: https://github.com/Wiltermoodj/design
- Format: Open Knowledge Format markdown

## Install

```bash
git clone https://github.com/Wiltermoodj/design.git /tmp/design && cd /tmp/design
bash scripts/install-design-skill.sh
```

For local development or offline validation, run from the cloned `design` repository root directly.

## Validate

```bash
node --experimental-strip-types scripts/ci/validate-frontmatter.ts .
node --experimental-strip-types scripts/ci/validate-links.ts .
```

## Quick Preview

- Layout: F-pattern, sidebar spec, z-index scale
- Spacing: defined token scale only
- Typography: defined scale and weights
- Color: semantic tokens in components; zero semantic alert color at rest
- Buttons: max 1 primary per surface; correct variant for risk level
- Badges/dots/pills: fully banned; use sub-label stacking or margin wash
- Async states: Empty, Loading, Error, Degraded
- Accessibility: WCAG 2.1 AA, focus rings, 44px touch targets
- Dark mode: minimum lightness delta on adjacent surfaces
- Scrollbars: auto-hide with idle fade

## Upgrade

```bash
bash scripts/install-design-skill.sh
```

Re-run the install script from any checkout of this repo to refresh the skill from upstream.

## Uninstall

Remove the installed skill directory:

```bash
rm -rf "${HERMES_SKILLS_DIR:-$HOME/.hermes/skills/design-guidelines}"
```

## Fallback behavior

The install script prefers a local source tree when run from inside a cloned copy of this repo; otherwise it falls back to cloning upstream into a temporary directory. If the expected bundled skill path is missing upstream, the script logs a skip message instead of failing.

## License

MIT
