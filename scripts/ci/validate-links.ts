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

async function validateLinks(rootDir: string): Promise<number> {
    const root = path.resolve(process.cwd(), rootDir);
    const files = await getFiles(root);
    const failures: { file: string; link: string; reason: string }[] = [];
    const linkRegex = /\[[^\]]*\]\(([^)]+)\)/g;

    for (const filePath of files) {
        const text = await fs.promises.readFile(filePath, 'utf8');
        let match;
        while ((match = linkRegex.exec(text)) !== null) {
            const link = match[1];
            if (link.startsWith('http') || link.startsWith('#')) {
                continue;
            }

            if (link.includes('#')) {
                const base = link.split('#')[0];
                if (base) {
                    const target = path.resolve(path.dirname(filePath), base);
                    if (!fs.existsSync(target)) {
                        failures.push({ file: filePath, link, reason: 'missing target' });
                    }
                }
            } else {
                const target = path.resolve(path.dirname(filePath), link);
                if (!fs.existsSync(target)) {
                    failures.push({ file: filePath, link, reason: 'missing file' });
                }
            }
        }
    }

    if (failures.length > 0) {
        console.log('LINK_FAILURES');
        for (const failure of failures) {
            console.log(`  ${failure.file}: ${failure.link} -> ${failure.reason}`);
        }
        return 1;
    }
    console.log(`LINK_OK checked=${files.length}`);
    return 0;
}

const rootArg = process.argv[2] || '.';
validateLinks(rootArg).then(exitCode => process.exit(exitCode));
