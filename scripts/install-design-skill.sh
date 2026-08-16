#!/bin/bash
set -euo pipefail
REPO="https://github.com/Wiltermoodj/design.git"
SKILL_SRC=".agents/skills/design-guidelines"
TMP_DIR="${TMPDIR:-/tmp}/design-install-$$"
HERMES_SKILLS_DIR="${HERMES_SKILLS_DIR:-$HOME/.hermes/skills/design-guidelines}"
SOURCE_DIR=""

cleanup() { rm -rf "$TMP_DIR" >/dev/null 2>&1 || true; }
trap cleanup EXIT

if git -C "$(pwd)" rev-parse --is-inside-work-tree >/dev/null 2>&1 && [ -f "$(pwd)/README.md" ]; then
  if [ -d "$(pwd)/$SKILL_SRC" ]; then
    SOURCE_DIR="$(pwd)"
  fi
fi

if [ -n "$SOURCE_DIR" ]; then
  echo "[design-install] Using local source tree: $SOURCE_DIR"
else
  echo "[design-install] Cloning $REPO ..."
  git clone --depth 1 "$REPO" "$TMP_DIR" >/dev/null 2>&1 || { echo "[design-install] ERROR: clone failed"; exit 1; }
  SOURCE_DIR="$TMP_DIR"
fi

echo "[design-install] Validating frontmatter ..."
FRONTMATTER_SCRIPT="$SOURCE_DIR/scripts/ci/validate_frontmatter.py"
LINK_SCRIPT="$SOURCE_DIR/scripts/ci/validate_links.py"
if [ -x "$FRONTMATTER_SCRIPT" ]; then
  if ! python3 "$FRONTMATTER_SCRIPT" "$SOURCE_DIR" >/dev/null 2>&1; then
    echo "[design-install] ERROR: frontmatter validation failed"
    python3 "$FRONTMATTER_SCRIPT" "$SOURCE_DIR" || true
    exit 1
  fi
else
  echo "[design-install] SKIP: frontmatter validator not found in source"
fi

echo "[design-install] Validating links ..."
if [ -x "$LINK_SCRIPT" ]; then
  if ! python3 "$LINK_SCRIPT" "$SOURCE_DIR" >/dev/null 2>&1; then
    echo "[design-install] ERROR: link validation failed"
    python3 "$LINK_SCRIPT" "$SOURCE_DIR" || true
    exit 1
  fi
else
  echo "[design-install] SKIP: link validator not found in source"
fi

if [ -n "$SOURCE_DIR" ] && [ "$SOURCE_DIR" != "$TMP_DIR" ]; then
  echo "[design-install] Source tree already validated; no copy needed."
else
  if [ ! -d "$SOURCE_DIR/$SKILL_SRC" ]; then
    echo "[design-install] SKIP: bundled skill path '$SKILL_SRC' not present in upstream; run from the design repo if needed."
  else
    echo "[design-install] Installing skill to $HERMES_SKILLS_DIR ..."
    mkdir -p "$HERMES_SKILLS_DIR"
    cp -R "$SOURCE_DIR/$SKILL_SRC/." "$HERMES_SKILLS_DIR/"
    echo "[design-install] Installed design-guidelines skill."
  fi
fi

echo "[design-install] Re-run this script to upgrade from latest upstream."
