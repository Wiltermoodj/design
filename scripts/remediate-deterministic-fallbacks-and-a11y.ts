import fs from 'fs';

const FALLBACK_FILES = [
  'src/components/dealers/brand-portfolio.tsx',
  'src/components/deals/merge-deal-dialog.tsx',
  'src/components/files/file-table.tsx',
  'src/components/financials/DownloadCsvButton.tsx',
  'src/components/financials/LedgerTable.tsx',
  'src/components/financials/PayoutHistory.tsx',
  'src/components/imports/SalesReconciliationGrid.tsx',
  'src/components/organizations/resource-manager.tsx',
  'src/components/organizations/smart-health-badge.tsx',
  'src/components/shared/tracking-details.tsx',
  'src/components/shared/user-avatar.tsx',
  'src/components/copilot/drawer.tsx'
];

function remediateFallbacks() {
  FALLBACK_FILES.forEach((filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace "Unknown", 'Unknown', "None", 'None', "-", '-' fallbacks with em-dash "—"
    content = content
      .replace(/\|\|\s*["']Unknown["']/g, '|| "—"')
      .replace(/\|\|\s*['"]None['"]/g, '|| "—"')
      .replace(/\?\?\s*["']Unknown["']/g, '?? "—"')
      .replace(/\?\?\s*['"]None['"]/g, '?? "—"')
      .replace(/\|\|\s*["']-["']/g, '|| "—"')
      .replace(/\|\|\s*['-']["']/g, '|| "—"')
      .replace(/\?\?\s*["']-["']/g, '?? "—"')
      .replace(/["']N\/A["']/g, '"—"')
      .replace(/['"]n\/a['"]/g, '"—"');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Remediated fallbacks in ${filePath}`);
  });
}

const EMOJI_FILES = [
  'src/components/inbox/context-pane.tsx',
  'src/components/layout/sidebar/sidebar.tsx',
  'src/components/timeline/cards/timeline-draft-card.tsx',
  'src/components/timeline/cards/timeline-owner-card.tsx',
  'src/components/timeline/timeline-item.tsx',
  'src/components/ui/inline/inline-location-select.tsx'
];

function remediateEmojis() {
  EMOJI_FILES.forEach((filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace emojis
    content = content
      .replace(/🏢/g, 'Building ')
      .replace(/👤/g, 'User ')
      .replace(/🔒/g, 'Private ')
      .replace(/⚠️/g, 'Warning ')
      .replace(/👁/g, 'View')
      .replace(/📎/g, 'Attachment')
      .replace(/✕/g, 'Close');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Remediated emojis in ${filePath}`);
  });
}

const A11Y_FILES = [
  'src/components/email/compose-form.tsx',
  'src/components/files/drive-import-dialog.tsx',
  'src/components/financials/RuleManager.tsx',
  'src/components/inbox/message-item.tsx',
  'src/components/inbox/thread-detail.tsx',
  'src/components/organizations/organization-layout.tsx',
  'src/components/organizations/resource-manager.tsx',
  'src/components/shared/audio-trigger.tsx',
  'src/components/trade-agreements/trade-agreements-data-table.tsx'
];

function remediateA11y() {
  A11Y_FILES.forEach((filePath) => {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const newLines = lines.map((line) => {
      if (/<Button[^>]*size=["'](?:icon|icon-sm|icon-lg)["'][^>]*>/.test(line) && !line.includes('aria-label')) {
        let label = 'Action button';
        if (line.includes('title=')) {
          const match = line.match(/title=["']([^"']+)["']/);
          if (match) label = match[1];
        } else if (line.includes('onClick')) {
          if (line.includes('Cancel') || line.includes('onCancel')) label = 'Cancel';
          else if (line.includes('Delete') || line.includes('remove')) label = 'Remove item';
          else if (line.includes('NavigateUp') || line.includes('up')) label = 'Navigate up';
          else if (line.includes('ContextOpen')) label = 'Toggle context panel';
        }
        return line.replace('<Button ', `<Button aria-label="${label}" `);
      }
      return line;
    });
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Remediated a11y icon buttons in ${filePath}`);
  });
}

remediateFallbacks();
remediateEmojis();
remediateA11y();
