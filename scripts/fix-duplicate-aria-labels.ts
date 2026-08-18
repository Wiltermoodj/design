import fs from 'fs';
import path from 'path';

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

const files = await getAllFiles(path.resolve(process.cwd(), 'src'));
let fixedFiles = 0;

await Promise.all(files.map(async (file) => {
  let content = await fs.promises.readFile(file, 'utf8');
  const original = content;

  // Fix duplicate aria-label attributes inside single JSX tags
  content = content.replace(/(<[A-Za-z0-9_]+[^>]*)\b(aria-label="[^"]*")([^>]*)\b(aria-label="[^"]*")/g, (match, p1, p2, p3, p4) => {
    // Keep the more specific aria-label if p2 is "Button action" or generic
    if (p2.includes('Button action')) {
      return `${p1}${p3} ${p4}`.replace(/\s+/g, ' ');
    }
    return `${p1} ${p2}${p3}`.replace(/\s+/g, ' ');
  });

  if (content !== original) {
    await fs.promises.writeFile(file, content, 'utf8');
    fixedFiles++;
  }
}));

console.log(`Cleaned up duplicate aria-labels across ${fixedFiles} files.`);
