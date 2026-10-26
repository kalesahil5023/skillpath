#!/usr/bin/env bash
set -e

echo "==> SkillSprint Backend Container Initializing..."

# Wait for PostgreSQL database if DATABASE_URL is configured with a PostgreSQL scheme
python - <<'EOF'
import os
import sys
import time
import dj_database_url
import psycopg2

database_url = os.getenv("DATABASE_URL")
if database_url and ("postgres" in database_url or "psql" in database_url):
    print("==> Checking PostgreSQL database connection...")
    config = dj_database_url.parse(database_url)
    max_retries = 30
    retry_interval = 2

    for i in range(1, max_retries + 1):
        try:
            conn = psycopg2.connect(
                dbname=config['NAME'],
                user=config['USER'],
                password=config['PASSWORD'],
                host=config['HOST'],
                port=config.get('PORT', 5432),
                connect_timeout=3
            )
            conn.close()
            print("==> Database connection successful!")
            sys.exit(0)
        except Exception as e:
            print(f"==> Waiting for database at {config['HOST']}:{config.get('PORT', 5432)}... (Attempt {i}/{max_retries})")
            time.sleep(retry_interval)
            
    print("==> ERROR: Could not connect to database within timeout.")
    sys.exit(1)
else:
    print("==> DATABASE_URL unset or SQLite detected. Proceeding...")
EOF

if [ "$SKIP_MIGRATIONS" != "true" ]; then
    # Run database migrations
    echo "==> Applying database migrations..."
    python manage.py migrate --noinput

    # Collect static files for WhiteNoise
    echo "==> Collecting static assets..."
    python manage.py collectstatic --noinput
else
    echo "==> Skipping migrations and collectstatic (handled by migration runner)..."
fi

echo "==> Backend ready. Starting server: $@"
exec "$@"
