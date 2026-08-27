#!/usr/bin/env bash
# ============================================================================
# SkillSprint Django Backend — Render Build Script
# ============================================================================
# This script runs during the Render BUILD phase.
# Render Root Directory should be set to: backend
# ============================================================================
set -o errexit

echo "==> Python: $(python --version)"
echo "==> Directory: $(pwd)"

echo "==> 1/3 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "==> 2/3 Collecting static files..."
python manage.py collectstatic --noinput

echo "==> 3/3 Running database migrations..."
python manage.py migrate --noinput

echo "==> Build complete!"
