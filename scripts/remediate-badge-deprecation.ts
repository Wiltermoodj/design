import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = path.resolve(process.cwd(), 'src/components');

async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(dirPath);
    const promises = files.map(async (file) => {
      const fullPath = path.join(dirPath, file);
      try {
        const stat = await fs.promises.stat(fullPath);
        if (stat.isDirectory()) {
          if (file !== 'node_modules' && file !== '.next') {
            await getAllFiles(fullPath, arrayOfFiles);
          }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          arrayOfFiles.push(fullPath);
        }
      } catch (e) {
        // ignore
      }
    });
    await Promise.all(promises);
  } catch(e) {
    // ignore
  }
  return arrayOfFiles;
}

async function remediateBadgeInFile(filePath: string) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  if (!content.includes('badge') && !content.includes('Badge')) return false;

  let modified = false;

  // 1. Remove Badge import line
  const lines = content.split('\n');
  const filteredLines = lines.filter((line) => {
    if (line.includes('@/components/ui/badge') || line.includes('@/components/ui/Badge')) {
      modified = true;
      return false;
    }
    return true;
  });

  let newContent = filteredLines.join('\n');

  // 2. Replace <Badge ...> content </Badge> with Sub-label Stacking typography
  // Pattern match single line or multiline Badge usage
  const badgeRegex = /<Badge\b[^>]*>([\s\S]*?)<\/Badge>/g;

  if (badgeRegex.test(newContent)) {
    modified = true;
    newContent = newContent.replace(badgeRegex, (match, innerText) => {
      // Sub-label Stacking System Standard: typography scale font-medium text-muted-foreground/60 text-xs
      return `<span className="text-xs font-medium text-muted-foreground/70">${innerText.trim()}</span>`;
    });
  }

  // Also replace self-closing <Badge ... />
  const selfClosingBadgeRegex = /<Badge\b[^>]*\/>/g;
  if (selfClosingBadgeRegex.test(newContent)) {
    modified = true;
    newContent = newContent.replace(selfClosingBadgeRegex, '');
  }

  // Also fix status dot patterns
  newContent = newContent.replace(/w-2\s+h-2\s+rounded-full\s+bg-[a-z0-9-/]+/g, 'text-xs text-muted-foreground/60 font-medium');

  if (modified) {
    await fs.promises.writeFile(filePath, newContent, 'utf8');
    return true;
  }
  return false;
}

async function runBadgeRemediation() {
  const files = await getAllFiles(COMPONENTS_DIR);
  let count = 0;
  await Promise.all(files.map(async (filePath) => {
    if (await remediateBadgeInFile(filePath)) {
      count++;
      console.log(`Remediated Badge deprecation in: ${path.relative(process.cwd(), filePath)}`);
    }
  }));
  console.log(`\nCompleted Badge remediation across ${count} files.`);
}

runBadgeRemediation().catch(console.error);
