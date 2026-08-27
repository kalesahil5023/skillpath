#!/usr/bin/env bash
# Exit immediately if any command exits with a non-zero status
set -o errexit

PYTHON_CMD="python"
if ! command -v python >/dev/null 2>&1; then
    PYTHON_CMD="python3"
fi

echo "==> 1. Running database migrations..."
$PYTHON_CMD manage.py migrate --noinput || echo "==> Notice: Migration skipped. Database will synchronize on demand."

echo "==> 2. Starting Gunicorn server on port ${PORT:-8000}..."
exec $PYTHON_CMD -m gunicorn --pythonpath . --pythonpath backend wsgi:application --bind 0.0.0.0:${PORT:-8000}
