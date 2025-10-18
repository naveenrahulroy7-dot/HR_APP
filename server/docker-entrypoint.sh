#!/bin/sh
set -e

# Wait for database
if [ -n "$DATABASE_URL" ]; then
  echo "Waiting for database to be ready..."
  npx prisma migrate deploy || true
fi

node dist/index.js
