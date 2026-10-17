# =============================================================================
# SkillSprint Backend Dockerfile (Django + DRF + Gunicorn)
# =============================================================================
FROM python:3.12-slim

# Prevent Python from writing .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Install system dependencies required for building psycopg2 and running curl healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy dependency requirements first to leverage Docker build cache
COPY requirements.txt /app/

# Upgrade pip and install Python packages
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend application source code
COPY . /app/

# Normalize line endings and set execute permissions on the entrypoint script
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && \
    chmod +x /app/docker-entrypoint.sh

# Create directory for collected static files
RUN mkdir -p /app/staticfiles

# Expose backend port
EXPOSE 8000

# Container health check using internal healthz endpoint
HEALTHCHECK --interval=20s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:8000/api/health/ || exit 1

# Set entrypoint to run migrations and collectstatic before starting
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Default start command using Gunicorn WSGI server
CMD ["gunicorn", "skillpath_backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120"]
