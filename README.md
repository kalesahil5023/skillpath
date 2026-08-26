# SkillSprint (SkillPath) — Full-Stack Redesign

SkillSprint is an educational career-planning and skill-building web application designed for beginners exploring legitimate online income paths (Freelancing, Affiliate Marketing, Online Remote Jobs).

The application has been redesigned into a decoupled, modern full-stack architecture:
- **Frontend**: React (Vite) with an elevated cybernetic dark theme, interactive 3D orb visuals, responsive components, and JWT authentication client.
- **Backend**: Django 5.x & Django REST Framework (DRF) with SimpleJWT authentication.
- **Database**: PostgreSQL (via `dj-database-url`, with seamless SQLite fallback for zero-friction local development).

---

## Architecture Overview

```
skillpath/
├── backend/                  # Django REST Framework backend
│   ├── manage.py
│   ├── requirements.txt      # Django, DRF, SimpleJWT, CORS, psycopg2, dj-database-url
│   ├── skillpath_backend/    # Django root settings, urls, asgi/wsgi
│   ├── accounts/             # User registration, JWT login/refresh, user profile
│   ├── plans/                # Path Finder plans & 7-day checklist progress
│   ├── roadmaps/             # 6 skill roadmaps & task completion tracker
│   └── portfolio/            # Portfolio entry case studies & project briefs
│
└── frontend/                 # React SPA (Vite)
    ├── package.json          # React, Vite, Lucide Icons, Axios
    ├── vite.config.js        # Configured proxy forwarding /api to Django
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx           # Master application layout
    │   ├── index.css         # Glassmorphic cybernetic design system
    │   ├── api/client.js     # Axios client with JWT auto-refresh interceptors
    │   ├── context/          # AuthContext (login, register, logout, sync state)
    │   ├── data/skillsData.js# Roadmap data, scoring engine, project templates
    │   └── components/       # Reusable UI components
```

---

## Getting Started Locally

### 1. Start the Django Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   ```bash
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. (Optional) Configure PostgreSQL in `.env`:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/skillsprint
   ```
   *If `DATABASE_URL` is omitted, Django automatically uses `db.sqlite3` for local development.*

4. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server on port 8000:
   ```bash
   python manage.py runserver 8000
   ```
   *The API will be available at `http://127.0.0.1:8000/api/`.*

---

### 2. Start the React Frontend

1. In a separate terminal window, navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`.

---

## API Endpoints Reference

### Authentication (`/api/auth/`)
- `POST /api/auth/register/` — Register with `username`, `email`, `password`, optional `displayName`.
- `POST /api/auth/login/` — Authenticate and receive `{ access, refresh, user }`.
- `POST /api/auth/token/refresh/` — Refresh access token using `refresh`.
- `GET /api/auth/me/` — Retrieve authenticated user profile.

### User Plans (`/api/plans/`)
- `GET /api/plans/` — Fetch active user plan and 7-day checklist items.
- `POST /api/plans/` — Save or overwrite a personalized Path Finder plan.
- `PATCH /api/plans/checklist/<day>/` — Toggle completion of day $N$ item (`{"completed": true}`).
- `DELETE /api/plans/` — Reset plan.

### Roadmap Progress (`/api/roadmaps/`)
- `GET /api/roadmaps/progress/` — Retrieve user's completed task indices grouped by skill.
- `POST /api/roadmaps/progress/` — Update status of a specific task index for a skill.

### Portfolio & Project Briefs (`/api/portfolio/`)
- `GET /api/portfolio/` & `POST /api/portfolio/` — List and create portfolio case studies.
- `PUT /api/portfolio/<id>/` & `DELETE /api/portfolio/<id>/` — Update and delete portfolio entries.
- `GET /api/portfolio/projects/` & `POST /api/portfolio/projects/` — List and save generated project briefs.

---

## Testing & Validation

Run the automated backend test suite:
```bash
./backend/venv/bin/python backend/test_api.py
```

Build the production frontend bundle:
```bash
cd frontend && npm run build
```
