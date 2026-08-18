import fs from 'fs';
import path from 'path';

const STATIC_COLOR_FILES = [
  'src/components/auth/reauth-banner.tsx',
  'src/components/contacts/contact-subscription-card.tsx',
  'src/components/email-analytics/campaign-metrics-summary.tsx',
  'src/components/email-analytics/engagement-velocity-feed.tsx',
  'src/components/email-analytics/open-time-heatmap.tsx',
  'src/components/planner/visit-queue.client.tsx',
  'src/components/settings/bluetooth-drive-settings.tsx',
  'src/components/shared/mic-permission-modal.tsx',
  'src/components/tasks/task-list.client.tsx'
];

async function remediateStaticColors() {
  STATIC_COLOR_FILES.forEach((filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    try { await fs.promises.access(fullPath); } catch { return; }
    let content = await fs.promises.readFile(fullPath, 'utf8');

    // Replace resting static alert color classes with neutral resting + hover-gated accent wash per user decision
    let modified = false;

    // Red resting alerts -> neutral resting with hover red accent
    if (content.includes('bg-rose-500') || content.includes('text-rose-300') || content.includes('border-rose-500')) {
      content = content
        .replace(/bg-rose-500\/20\s+text-rose-300\s+border-rose-500\/30/g, 'bg-muted/40 text-muted-foreground border-border/40 hover:bg-muted/50 hover:text-destructive')
        .replace(/bg-rose-950\/30\s+text-rose-400\s+border-rose-900\/40/g, 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-destructive');
      modified = true;
    }

    // Emerald resting alerts -> neutral resting with hover green accent
    if (content.includes('bg-emerald-500') || content.includes('text-emerald-600') || content.includes('border-emerald-500')) {
      content = content
        .replace(/text-emerald-600\s+dark:text-emerald-400\s+bg-emerald-500\/10/g, 'text-muted-foreground bg-muted/40 hover:text-emerald-500 hover:bg-emerald-500/10')
        .replace(/bg-emerald-500\/20\s+text-emerald-300\s+border-emerald-500\/30/g, 'bg-muted/40 text-muted-foreground border-border/40 hover:bg-emerald-500/10 hover:text-emerald-500')
        .replace(/bg-emerald-950\/30\s+text-emerald-400\s+border-emerald-900\/40/g, 'bg-muted/30 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500');
      modified = true;
    }

    // Amber resting alerts -> neutral resting with hover amber accent
    if (content.includes('bg-amber-500') || content.includes('text-amber-600') || content.includes('border-amber-500')) {
      content = content
        .replace(/bg-amber-500\/10\s+border-b\s+border-amber-500\/20\s+px-4\s+py-2\.5\s+flex\s+items-center\s+justify-between\s+text-xs\s+text-amber-200/g, 'bg-muted/40 border-b border-border/40 px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500')
        .replace(/text-amber-600\s+dark:text-amber-400\s+bg-amber-500\/10/g, 'text-muted-foreground bg-muted/40 hover:text-amber-500 hover:bg-amber-500/10')
        .replace(/border-amber-500\/30\s+bg-amber-500\/5\s+dark:bg-amber-500\/10/g, 'border-border/40 bg-muted/30 hover:border-amber-500/30 hover:bg-amber-500/10');
      modified = true;
    }

    if (modified) {
      await fs.promises.writeFile(fullPath, content, 'utf8');
      console.log(`Remediated static alert colors in ${filePath}`);
    }
  });
}

remediateStaticColors().catch(console.error);
