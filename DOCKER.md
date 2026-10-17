# SkillSprint Containerization Guide

This guide covers building, running, and managing SkillSprint using Docker and Docker Compose.

---

## Architecture Overview

```
                         Browser Client
                              │
                    Port 80 (or $PORT)
                              ▼
            ┌───────────────────────────────────┐
            │   Frontend Container (Nginx)      │
            │   - Serves React SPA static files │
            │   - Proxies /api/ ───┐            │
            │   - Proxies /admin/ ─┼──┐         │
            └──────────────────────┼──┼─────────┘
                                   │  │ (Docker Internal Network)
                                   ▼  ▼
            ┌───────────────────────────────────┐
            │   Backend Container (Gunicorn)    │
            │   - Django 5.x REST Framework     │
            │   - Port 8000 (Internal & Host)   │
            │   - WhiteNoise Static Files       │
            └──────────────────┬────────────────┘
                               │
                               ▼
            ┌───────────────────────────────────┐
            │   Database Container (PostgreSQL) │
            │   - PostgreSQL 16 Alpine          │
            │   - Port 5432 (Internal & Host)   │
            │   - Persistent Volume Mount       │
            └───────────────────────────────────┘
```

---

## Prerequisites

1. **Docker Desktop** installed and running on your machine.
   - If using Windows, make sure Docker Desktop is started (WSL 2 or Hyper-V backend).
2. **Docker Compose v2** (included with modern Docker Desktop via `docker compose`).

---

## Production Deployment (Recommended)

### 1. Configure Environment (Optional)

Copy the Docker environment template:

```bash
cp .env.docker.example .env
```

Edit `.env` to customize passwords, secret keys, or change the exposed web port (`PORT=80` or `PORT=3000`).

### 2. Build and Launch Containers

Run the following command in the project root:

```bash
docker compose up --build -d
```

Docker Compose will:
1. Start the PostgreSQL 16 database and wait until healthcheck passes.
2. Build the Django backend image, run automated database migrations (`python manage.py migrate`), collect static files, and start Gunicorn on port `8000`.
3. Build the React frontend with Vite, compile static assets, copy them to Nginx, and launch on port `80`.

### 3. Verify Container Status

```bash
docker compose ps
```

All three services (`skillsprint-db`, `skillsprint-backend`, `skillsprint-frontend`) should display as `Up (healthy)`.

### 4. Access the Application

- **Web Application**: Open [http://localhost](http://localhost) (or `http://localhost:3000` if you adjusted `PORT`).
- **Django REST API**: [http://localhost:8000/api/](http://localhost:8000/api/)
- **Django Admin**: [http://localhost/admin/](http://localhost/admin/) or [http://localhost:8000/admin/](http://localhost:8000/admin/)
- **Healthcheck**: [http://localhost/healthz](http://localhost/healthz) and [http://localhost:8000/api/health/](http://localhost:8000/api/health/)

---

## Development Mode (With Live Code Reloading)

If you are developing features and want live changes in your code to immediately reflect without rebuilding images:

```bash
docker compose -f docker-compose.dev.yml up --build
```

- **Frontend**: Runs Vite dev server at [http://localhost:5173](http://localhost:5173) with Hot Module Replacement (HMR).
- **Backend**: Runs Django auto-reloading dev server at [http://localhost:8000](http://localhost:8000).
- **Database**: PostgreSQL 16 container at `localhost:5432`.

---

## Useful Operational Commands

### Create a Django Superuser
```bash
docker compose exec backend python manage.py createsuperuser
```

### Run Ad-hoc Migrations
```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

### View Application Logs
```bash
# Follow logs for all containers
docker compose logs -f

# Follow logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### Access Container Shell
```bash
# Django backend shell
docker compose exec backend bash

# PostgreSQL interactive database shell
docker compose exec db psql -U postgres -d skillsprint
```

### Stop Containers
```bash
# Stop containers without deleting data
docker compose down

# Stop containers and remove persistent database volume
docker compose down -v
```

---

## Troubleshooting

1. **Docker daemon not connecting on Windows**:
   - Start the **Docker Desktop** application from your Windows Start Menu.
   - Wait until the Docker engine status icon turns green in the taskbar.

2. **Port 80 is already occupied**:
   - If port 80 is in use by IIS or another server, change `PORT=3000` or `PORT=8080` in your `.env` file before running `docker compose up`.

3. **Database connection timeout during initial startup**:
   - The backend `docker-entrypoint.sh` includes an automated retry loop that polls PostgreSQL until it is accepting connections before initiating Django migrations.
