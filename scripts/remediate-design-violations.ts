import fs from 'fs';
import path from 'path';

/**
 * Phase 3 Remediation Script: Clean up residual border/background alert fills on resting surfaces
 */

interface Violation {
  file: string;
}

interface AuditReport {
  violations: Violation[];
}

function runPhase3Remediation() {
  const jsonPath = path.resolve(process.cwd(), 'scratch/design-audit-results.json');
  if (!fs.existsSync(jsonPath)) return;

  const report: AuditReport = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const fileSet = new Set(report.violations.map(v => v.file));

  let fixedCount = 0;

  fileSet.forEach((relativePath) => {
    const fullPath = path.resolve(process.cwd(), relativePath);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    const isModalOrDialog = content.includes('AlertDialog') || content.includes('DialogContent') || content.includes('DropdownMenu') || content.includes('Popover');

    if (!isModalOrDialog) {
      content = content.replace(/\bbg-destructive\/(?:5|10|15|20)\b/g, 'bg-muted/50');
      content = content.replace(/\bbg-success\/(?:5|10|15|20)\b/g, 'bg-accent/50');
      content = content.replace(/\bbg-warning\/(?:5|10|15|20)\b/g, 'bg-accent/50');
      content = content.replace(/\bborder-destructive\/(?:10|20|30|50)\b/g, 'border-border');
      content = content.replace(/\bborder-success\/(?:10|20|30|50)\b/g, 'border-border');
      content = content.replace(/\bborder-warning\/(?:10|20|30|50)\b/g, 'border-border');
      content = content.replace(/\bfont-medium font-medium\b/g, 'font-medium');
    }

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      fixedCount++;
    }
  });

  console.log(`✅ Phase 3 Remediation complete! Fixed residual alert fills in ${fixedCount} files.`);
}

runPhase3Remediation();
