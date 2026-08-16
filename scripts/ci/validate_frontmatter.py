#!/usr/bin/env python3
import sys
from pathlib import Path

def validate_frontmatter(root: Path):
    files = list(root.rglob('*.md'))
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
        for key in ['title', 'type', 'status', 'description']:
            if f'{key}:' not in fm:
                failures.append((str(path), f'missing {key}'))
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
