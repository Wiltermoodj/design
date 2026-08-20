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

## Install into a Repository

To install the skill, `RULES.md` routing matrix, and compliance scripts directly into your project:

```bash
# Run from within your target project root:
curl -fsSL https://raw.githubusercontent.com/Wiltermoodj/design/main/scripts/install-design-skill.sh | bash

# Or install to a specific directory path:
bash scripts/install-design-skill.sh /path/to/target-repo
```

### What Gets Installed
- **`.agents/skills/design-guidelines/`**: `SKILL.md` and `REFERENCE.md` defining all design standards, checklists, and token scales.
- **`RULES.md`**: Lightweight Open Knowledge Format context map and decision matrix for AI coding agents.
- **`scripts/design/`**: Automated compliance audit (`audit-design-system-compliance.ts`) and remediation scripts.

## Validate

```bash
python scripts/ci/validate_frontmatter.py .
python scripts/ci/validate_links.py .
node scripts/verify-design-adrs.mjs
bash scripts/install-design-skill.sh --check
```

## Quick Preview

- Layout: F-pattern, sidebar spec, z-index scale
- Spacing: defined token scale only (`space-1`→`space-12`)
- Typography: defined scale and weights; max 24px application UI cap
- Color: semantic tokens in components; zero semantic alert color at rest
- Buttons: max 1 primary per surface; correct variant for risk level
- Badges/dots/pills: fully banned; use sub-label stacking or margin wash
- Async states: Empty, Loading, Error, Degraded
- Accessibility: WCAG 2.1 AA, focus rings, 44px touch targets
- Dark mode: minimum lightness delta on adjacent surfaces
- Scrollbars: auto-hide with idle fade

## Upgrade

Re-run the installer from inside your project:

```bash
bash scripts/install-design-skill.sh .
```

## Uninstall

Remove the installed files from your repository:

```bash
rm -rf .agents/skills/design-guidelines scripts/design RULES.md
```

## License

MIT
