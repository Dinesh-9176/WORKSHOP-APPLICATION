#!/bin/bash
# Manual deploy script — run this on the server any time you want to redeploy.
# Usage: bash deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "──── Pulling latest code ────"
git pull origin main

echo "──── Rebuilding & restarting containers ────"
docker compose --env-file .env up -d --build --remove-orphans

echo "──── Cleaning old images ────"
docker image prune -f

echo "──── Status ────"
docker compose ps

echo ""
echo "✅ Deploy complete. Visit https://$(grep '^DOMAIN=' .env | cut -d= -f2)"
