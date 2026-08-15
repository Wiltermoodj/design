import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(path.resolve(process.cwd(), 'src'));
let fixedFiles = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
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
    fs.writeFileSync(file, content, 'utf8');
    fixedFiles++;
  }
});

console.log(`Cleaned up duplicate aria-labels across ${fixedFiles} files.`);
