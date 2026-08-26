#!/usr/bin/env bash
# Exit immediately on error
set -o errexit

PYTHON_CMD="python"
if ! command -v python >/dev/null 2>&1; then
    PYTHON_CMD="python3"
fi

echo "==> Using Python: $($PYTHON_CMD --version)"

echo "==> Upgrading pip..."
$PYTHON_CMD -m pip install --upgrade pip

echo "==> Installing dependencies..."
$PYTHON_CMD -m pip install -r requirements.txt

echo "==> Collecting static files..."
$PYTHON_CMD manage.py collectstatic --noinput

echo "==> Running database migrations..."
$PYTHON_CMD manage.py migrate --noinput

echo "==> Build finished successfully!"
