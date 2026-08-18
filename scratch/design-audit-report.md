# Design System Compliance Audit Report

**Date:** 2026-08-18T21:29:45.593Z
**Target Directory:** `scripts`
**Total Files Audited:** 9
**Clean Files:** 3 (33.3%)
**Files with Violations:** 6
**Total Violations Detected:** 21

## Violation Breakdown by Rule

| Rule | ADR | Count |
|---|---|---|
| Badge Deprecation | ADR 0035 | 4 |
| Linear Easing Banned | ADR 0022 | 1 |
| transition:all Banned | ADR 0022 | 3 |
| Raw Emoji in Functional UI | ADR 0021 | 11 |
| Static Alert Colors | ADR 0020 | 2 |

## Violation Breakdown by Directory

| Directory | Violations | Status |
|---|---|---|
| `scripts` | 21 | ⚠️ Needs Review |

## Detailed Violation Log

- **[ERROR]** `scripts/audit-design-system-compliance.ts:61` — **Badge Deprecation** (ADR 0035): Usage of deprecated Badge component. Replace with Sub-label Stacking or Margin Wash Variant.
  ```tsx
  if (lineText.includes('@/components/ui/badge') || lineText.includes('@/components/ui/Badge') || /<Badge[\s/>]/.test(lineText)) {
  ```
- **[ERROR]** `scripts/audit-design-system-compliance.ts:142` — **Linear Easing Banned** (ADR 0022): Linear easing is strictly banned system-wide. Use cubic-bezier curves.
  ```tsx
  if (/transition-[a-z-]*\s+linear/.test(lineText) || /ease-linear/.test(lineText)) {
  ```
- **[WARNING]** `scripts/audit-design-system-compliance.ts:154` — **transition:all Banned** (ADR 0022): `transition: all` is a forbidden pattern — animates unintended properties. Use specific transition properties.
  ```tsx
  // Rule 6b: transition:all (ADR 0022 — forbidden pattern)
  ```
- **[WARNING]** `scripts/audit-design-system-compliance.ts:159` — **transition:all Banned** (ADR 0022): `transition: all` is a forbidden pattern — animates unintended properties. Use specific transition properties.
  ```tsx
  rule: 'transition:all Banned',
  ```
- **[WARNING]** `scripts/audit-design-system-compliance.ts:163` — **transition:all Banned** (ADR 0022): `transition: all` is a forbidden pattern — animates unintended properties. Use specific transition properties.
  ```tsx
  description: '`transition: all` is a forbidden pattern — animates unintended properties. Use specific transition properties.'
  ```
- **[WARNING]** `scripts/audit-design-system-compliance.ts:397` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  md += `| \`${dir}\` | ${byDir[dir].length} | ${byDir[dir].length > 0 ? '⚠️ Needs Review' : '✅ Compliant'} |\n`;
  ```
- **[ERROR]** `scripts/remediate-badge-deprecation.ts:40` — **Badge Deprecation** (ADR 0035): Usage of deprecated Badge component. Replace with Sub-label Stacking or Margin Wash Variant.
  ```tsx
  if (line.includes('@/components/ui/badge') || line.includes('@/components/ui/Badge')) {
  ```
- **[ERROR]** `scripts/remediate-badge-deprecation.ts:49` — **Badge Deprecation** (ADR 0035): Usage of deprecated Badge component. Replace with Sub-label Stacking or Margin Wash Variant.
  ```tsx
  // 2. Replace <Badge ...> content </Badge> with Sub-label Stacking typography
  ```
- **[ERROR]** `scripts/remediate-badge-deprecation.ts:61` — **Badge Deprecation** (ADR 0035): Usage of deprecated Badge component. Replace with Sub-label Stacking or Margin Wash Variant.
  ```tsx
  // Also replace self-closing <Badge ... />
  ```
- **[WARNING]** `scripts/remediate-design-violations.ts:49` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  console.log(`✅ Phase 3 Remediation complete! Fixed residual alert fills in ${fixedCount} files.`);
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:56` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/🏢/g, 'Building ')
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:57` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/👤/g, 'User ')
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:58` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/🔒/g, 'Private ')
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:59` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/⚠️/g, 'Warning ')
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:60` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/👁/g, 'View')
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:61` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/📎/g, 'Attachment')
  ```
- **[WARNING]** `scripts/remediate-deterministic-fallbacks-and-a11y.ts:62` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  .replace(/✕/g, 'Close');
  ```
- **[WARNING]** `scripts/remediate-static-colors.ts:34` — **Static Alert Colors** (ADR 0020): Static alert color on resting UI element. Restrict colored alerts to transient states or active hover.
  ```tsx
  if (content.includes('bg-emerald-500') || content.includes('text-emerald-600') || content.includes('border-emerald-500')) {
  ```
- **[WARNING]** `scripts/remediate-static-colors.ts:43` — **Static Alert Colors** (ADR 0020): Static alert color on resting UI element. Restrict colored alerts to transient states or active hover.
  ```tsx
  if (content.includes('bg-amber-500') || content.includes('text-amber-600') || content.includes('border-amber-500')) {
  ```
- **[WARNING]** `scripts/verify-design-adrs.ts:12` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  console.error(`❌ [ERROR] ${msg}`);
  ```
- **[WARNING]** `scripts/verify-design-adrs.ts:17` — **Raw Emoji in Functional UI** (ADR 0021): Raw unicode emoji used in functional UI. Replace with Lucide icon.
  ```tsx
  console.log(`✅ ${msg}`);
  ```
