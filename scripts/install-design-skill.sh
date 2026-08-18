#!/bin/bash
set -euo pipefail
REPO="https://github.com/Wiltermoodj/design.git"
SKILL_SRC="."
TMP_DIR="${TMPDIR:-/tmp}/design-install-$$"
HERMES_SKILLS_DIR="${HERMES_SKILLS_DIR:-$HOME/.hermes/skills/design-guidelines}"
SOURCE_DIR=""

cleanup() { rm -rf "$TMP_DIR" >/dev/null 2>&1 || true; }
trap cleanup EXIT

CHECK_ONLY=false
if [ "${1:-}" = "--check" ]; then
  CHECK_ONLY=true
fi

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
FRONTMATTER_SCRIPT="$SOURCE_DIR/scripts/ci/validate-frontmatter.ts"
LINK_SCRIPT="$SOURCE_DIR/scripts/ci/validate-links.ts"
if [ -f "$FRONTMATTER_SCRIPT" ]; then
  if ! npx -y tsx "$FRONTMATTER_SCRIPT" "$SOURCE_DIR" >/dev/null 2>&1; then
    echo "[design-install] ERROR: frontmatter validation failed"
    npx -y tsx "$FRONTMATTER_SCRIPT" "$SOURCE_DIR" || true
    exit 1
  fi
else
  echo "[design-install] SKIP: frontmatter validator not found in source"
fi

echo "[design-install] Validating links ..."
if [ -f "$LINK_SCRIPT" ]; then
  if ! npx -y tsx "$LINK_SCRIPT" "$SOURCE_DIR" >/dev/null 2>&1; then
    echo "[design-install] ERROR: link validation failed"
    npx -y tsx "$LINK_SCRIPT" "$SOURCE_DIR" || true
    exit 1
  fi
else
  echo "[design-install] SKIP: link validator not found in source"
fi

if [ -d "$SOURCE_DIR/$SKILL_SRC" ]; then
  if [ "$CHECK_ONLY" = true ]; then
    echo "[design-install] CHECK OK: bundled skill path '$SKILL_SRC' present in source."
  else
    echo "[design-install] Installing skill to $HERMES_SKILLS_DIR ..."
    mkdir -p "$HERMES_SKILLS_DIR"
    cp -R "$SOURCE_DIR/$SKILL_SRC/." "$HERMES_SKILLS_DIR/"
    echo "[design-install] Installed design-guidelines skill."
  fi
else
  if [ "$CHECK_ONLY" = true ]; then
    echo "[design-install] CHECK FAIL: bundled skill path '$SKILL_SRC' not present in source."
    exit 1
  fi
  echo "[design-install] SKIP: bundled skill path '$SKILL_SRC' not present in source; run from the design repo if needed."
fi

if [ "$CHECK_ONLY" = true ]; then
  echo "[design-install] CHECK OK: source validates and is installable."
fi
