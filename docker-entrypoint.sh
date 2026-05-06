#!/bin/sh
set -e

echo "[entrypoint] Running database migrations..."
node /app/scripts/migrate.js

echo "[entrypoint] Starting Next.js..."
exec node server.js
