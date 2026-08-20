#!/usr/bin/env python3
import sys
from pathlib import Path
import re

def validate_links(root: Path, exclude_prefixes=('.kanban', 'node_modules', '.git')):
    files = [
        p for p in root.rglob('*.md')
        if not any(str(p.relative_to(root)).startswith(pre) for pre in exclude_prefixes)
    ]
    failures = []
    for path in files:
        text = path.read_text()
        links = re.findall(r'\[[^\]]*\]\(([^)]+)\)', text)
        for link in links:
            if link.startswith('http') or link.startswith('#'):
                continue
            target = (path.parent / link).resolve()
            if '#' in link:
                base, _ = link.split('#', 1)
                if base and not (path.parent / base).exists():
                    failures.append((str(path), link, 'missing target'))
            else:
                if not target.exists():
                    failures.append((str(path), link, 'missing file'))
    if failures:
        print('LINK_FAILURES')
        for path, link, reason in failures:
            print(f'  {path}: {link} -> {reason}')
        return 1
    print(f'LINK_OK checked={len(files)}')
    return 0

if __name__ == '__main__':
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    sys.exit(validate_links(root))
