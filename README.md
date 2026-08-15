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

## Validate

```bash
python scripts/ci/validate_frontmatter.py .
python scripts/ci/validate_links.py .
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

## License

MIT
