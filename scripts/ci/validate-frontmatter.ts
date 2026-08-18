import fs from 'fs';
import path from 'path';

async function getFiles(dir: string, files: string[] = [], excludePrefixes: string[] = ['.kanban', 'node_modules']): Promise<string[]> {
    try {
        const fileList = await fs.promises.readdir(dir);
        for (const file of fileList) {
            const fullPath = path.join(dir, file);
            const relPath = path.relative(process.cwd(), fullPath);
            if (excludePrefixes.some(pre => relPath.startsWith(pre) || relPath.includes('/' + pre + '/'))) {
                continue;
            }
            const stat = await fs.promises.stat(fullPath);
            if (stat.isDirectory()) {
                await getFiles(fullPath, files, excludePrefixes);
            } else if (fullPath.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    } catch(e) {}
    return files;
}

async function validateFrontmatter(rootDir: string): Promise<number> {
    const root = path.resolve(process.cwd(), rootDir);
    const files = await getFiles(root);
    const failures: { file: string; reason: string }[] = [];

    for (const filePath of files) {
        const text = await fs.promises.readFile(filePath, 'utf8');
        if (!text.startsWith('---')) {
            failures.push({ file: filePath, reason: 'missing frontmatter block' });
            continue;
        }
        const end = text.indexOf('---', 3);
        if (end === -1) {
            failures.push({ file: filePath, reason: 'unclosed frontmatter' });
            continue;
        }
        const fm = text.substring(3, end);
        for (const key of ['title', 'type', 'status', 'description']) {
            if (!fm.includes(`${key}:`)) {
                failures.push({ file: filePath, reason: `missing ${key}` });
            }
        }
    }

    if (failures.length > 0) {
        console.log('FRONTMATTER_FAILURES');
        for (const failure of failures) {
            console.log(`  ${failure.file}: ${failure.reason}`);
        }
        return 1;
    }
    console.log(`FRONTMATTER_OK checked=${files.length}`);
    return 0;
}

const rootArg = process.argv[2] || '.';
validateFrontmatter(rootArg).then(exitCode => process.exit(exitCode));
