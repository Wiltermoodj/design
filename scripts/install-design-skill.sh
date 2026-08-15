#!/bin/bash
set -euo pipefail
REPO="https://github.com/Wiltermoodj/design.git"
SKILL_SRC=".agents/skills/design-guidelines"
TMP_DIR="${TMPDIR:-/tmp}/design-install-$$"
HERMES_SKILLS_DIR="${HERMES_SKILLS_DIR:-$HOME/.hermes/skills/design-guidelines}"

cleanup() { rm -rf "$TMP_DIR" >/dev/null 2>&1 || true; }
trap cleanup EXIT

echo "[design-install] Cloning $REPO ..."
git clone --depth 1 "$REPO" "$TMP_DIR" >/dev/null 2>&1 || { echo "[design-install] ERROR: clone failed"; exit 1; }

echo "[design-install] Validating frontmatter ..."
if ! python3 "$TMP_DIR/scripts/ci/validate_frontmatter.py" "$TMP_DIR" >/dev/null 2>&1; then
  echo "[design-install] ERROR: frontmatter validation failed"; exit 1
fi

echo "[design-install] Validating links ..."
if ! python3 "$TMP_DIR/scripts/ci/validate_links.py" "$TMP_DIR" >/dev/null 2>&1; then
  echo "[design-install] ERROR: link validation failed"; exit 1
fi

echo "[design-install] Installing skill to $HERMES_SKILLS_DIR ..."
mkdir -p "$HERMES_SKILLS_DIR"
cp -R "$TMP_DIR/$SKILL_SRC/." "$HERMES_SKILLS_DIR/"

echo "[design-install] Installed design-guidelines skill."
echo "[design-install] Upgrading: re-run this script to pull latest changes."
