#!/bin/bash
set -euo pipefail
REPO="https://github.com/Wiltermoodj/design.git"
SKILL_SRC=".agents/skills/design-guidelines"
TMP_DIR="${TMPDIR:-/tmp}/design-install-$$"
SOURCE_DIR=""

cleanup() { rm -rf "$TMP_DIR" >/dev/null 2>&1 || true; }
trap cleanup EXIT

CHECK_ONLY=false
TARGET_PROJECT=""

for arg in "$@"; do
  case "$arg" in
    --check)
      CHECK_ONLY=true
      ;;
    -*)
      echo "[design-install] Unknown option: $arg"
      exit 1
      ;;
    *)
      if [ -z "$TARGET_PROJECT" ]; then
        TARGET_PROJECT="$arg"
      fi
      ;;
  esac
done

if [ -z "$TARGET_PROJECT" ]; then
  TARGET_PROJECT="$(pwd)"
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
FRONTMATTER_SCRIPT="$SOURCE_DIR/scripts/ci/validate_frontmatter.py"
LINK_SCRIPT="$SOURCE_DIR/scripts/ci/validate_links.py"
if [ -f "$FRONTMATTER_SCRIPT" ]; then
  if ! python3 "$FRONTMATTER_SCRIPT" "$SOURCE_DIR" >/dev/null 2>&1; then
    echo "[design-install] ERROR: frontmatter validation failed"
    python3 "$FRONTMATTER_SCRIPT" "$SOURCE_DIR" || true
    exit 1
  fi
else
  echo "[design-install] SKIP: frontmatter validator not found in source"
fi

echo "[design-install] Validating links ..."
if [ -f "$LINK_SCRIPT" ]; then
  if ! python3 "$LINK_SCRIPT" "$SOURCE_DIR" >/dev/null 2>&1; then
    echo "[design-install] ERROR: link validation failed"
    python3 "$LINK_SCRIPT" "$SOURCE_DIR" || true
    exit 1
  fi
else
  echo "[design-install] SKIP: link validator not found in source"
fi

if [ -d "$SOURCE_DIR/$SKILL_SRC" ]; then
  if [ "$CHECK_ONLY" = true ]; then
    echo "[design-install] CHECK OK: bundled skill path '$SKILL_SRC' present in source."
  else
    DEST_SKILL_DIR="$TARGET_PROJECT/.agents/skills/design-guidelines"
    DEST_SCRIPTS_DIR="$TARGET_PROJECT/scripts/design"
    echo "[design-install] Installing skill to $DEST_SKILL_DIR ..."
    mkdir -p "$DEST_SKILL_DIR"
    cp -R "$SOURCE_DIR/$SKILL_SRC/." "$DEST_SKILL_DIR/"

    if [ -f "$SOURCE_DIR/RULES.md" ]; then
      echo "[design-install] Installing RULES.md to $TARGET_PROJECT/RULES.md ..."
      cp "$SOURCE_DIR/RULES.md" "$TARGET_PROJECT/RULES.md"
    fi

    if [ -d "$SOURCE_DIR/scripts" ]; then
      echo "[design-install] Installing compliance & remediation scripts to $DEST_SCRIPTS_DIR ..."
      mkdir -p "$DEST_SCRIPTS_DIR"
      for script in audit-design-system-compliance.ts fix-duplicate-aria-labels.ts remediate-all.ts remediate-badge-deprecation.ts remediate-design-violations.ts remediate-deterministic-fallbacks-and-a11y.ts remediate-static-colors.ts; do
        if [ -f "$SOURCE_DIR/scripts/$script" ]; then
          cp "$SOURCE_DIR/scripts/$script" "$DEST_SCRIPTS_DIR/"
        fi
      done
    fi

    echo "[design-install] Successfully installed design-guidelines skill and automation scripts to $TARGET_PROJECT."
  fi
else
  if [ "$CHECK_ONLY" = true ]; then
    echo "[design-install] CHECK FAIL: bundled skill path '$SKILL_SRC' not present in source."
    exit 1
  fi
  echo "[design-install] ERROR: bundled skill path '$SKILL_SRC' not present in source."
  exit 1
fi

if [ "$CHECK_ONLY" = true ]; then
  echo "[design-install] CHECK OK: source validates and is installable."
fi
