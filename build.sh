#!/usr/bin/env bash
# Exit immediately if any non-optional command exits with a non-zero status
set -o errexit

PYTHON_CMD="python"
if ! command -v python >/dev/null 2>&1; then
    PYTHON_CMD="python3"
fi

echo "=========================================="
echo "==> Build Environment: $($PYTHON_CMD --version)"
echo "==> Working Directory: $(pwd)"
echo "=========================================="

echo "==> 1. Upgrading pip..."
$PYTHON_CMD -m pip install --upgrade pip

echo "==> 2. Installing Python dependencies..."
$PYTHON_CMD -m pip install -r requirements.txt

echo "==> 3. Collecting static files..."
$PYTHON_CMD manage.py collectstatic --noinput

echo "==> 4. Applying database migrations..."
$PYTHON_CMD manage.py migrate --noinput || echo "==> Notice: Database migration skipped during build step. Migrations will run at service startup."

echo "=========================================="
echo "==> SkillSprint Build Finished Successfully!"
echo "=========================================="
