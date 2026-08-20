#!/usr/bin/env python3
import sys
from pathlib import Path

def validate_frontmatter(root: Path, exclude_prefixes=('.kanban', 'node_modules', '.git')):
    files = [
        p for p in root.rglob('*.md')
        if not any(str(p.relative_to(root)).startswith(pre) for pre in exclude_prefixes)
    ]
    failures = []
    for path in files:
        text = path.read_text()
        if not text.startswith('---'):
            failures.append((str(path), 'missing frontmatter block'))
            continue
        end = text.find('---', 3)
        if end == -1:
            failures.append((str(path), 'unclosed frontmatter'))
            continue
        fm = text[3:end]
        fm_lines = fm.strip().split('\n')
        fm_keys = {}
        curr_key = None
        for line in fm_lines:
            if ':' in line and not line.startswith(' ') and not line.startswith('\t'):
                k, v = line.split(':', 1)
                curr_key = k.strip()
                fm_keys[curr_key] = v.strip()
            elif curr_key:
                fm_keys[curr_key] += ' ' + line.strip()

        for key in ['title', 'type', 'status', 'description']:
            if key not in fm_keys:
                failures.append((str(path), f'missing {key}'))
            elif not fm_keys[key] or fm_keys[key] in ('>', '|', "''", '""'):
                failures.append((str(path), f'empty {key} value'))
    if failures:
        print('FRONTMATTER_FAILURES')
        for path, reason in failures:
            print(f'  {path}: {reason}')
        return 1
    print(f'FRONTMATTER_OK checked={len(files)}')
    return 0

if __name__ == '__main__':
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
    sys.exit(validate_frontmatter(root))
