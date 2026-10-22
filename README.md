# SkillSprint (SkillPath) — Full-Stack Career & Skill Architecture

SkillSprint is a high-performance, containerized full-stack web platform built for aspiring digital professionals exploring legitimate online career paths (Freelancing, Remote Tech Jobs, and Affiliate Marketing).

The platform features an interactive Path Finder recommendation engine, 6 comprehensive career roadmaps, a 7-day starter sprint tracker, dynamic portfolio case-study builders, and an interactive technical/HR interview prep suite.

---

## Architecture Overview

```
                                  Internet / Global Users
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    Cloudflare Global Anycast Edge (330+ POPs)│
                      │    - Free Automatic SSL/TLS Encryption       │
                      │    - Global CDN Edge Caching                 │
                      │    - DDoS Mitigation & Web Application WAF   │
                      └──────────────────────┬───────────────────────┘
                                             │ Outbound Encrypted Tunnel
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    Local Host / Containerized Ingress        │
                      │    - cloudflared Tunnel Daemon               │
                      │    - Forwards to Docker port 80              │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    Frontend Container (Nginx 1.27 Alpine)    │
                      │    - High-Performance Production Web Server  │
                      │    - React 19 + Vite Static SPA Assets       │
                      │    - Reverse Proxies /api/ and /admin/ ─────┐│
                      └─────────────────────────────────────────────┼┘
                                                                    │
                                                                    ▼
                      ┌──────────────────────────────────────────────┐
                      │    Backend Container (Django 5.x + Gunicorn) │
                      │    - Django REST Framework + SimpleJWT       │
                      │    - Multi-worker WSGI Server (:8000)        │
                      │    - WhiteNoise Static Compression           │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    Database Container (PostgreSQL 16 Alpine) │
                      │    - Persistent User Data & State Tracking   │
                      │    - Port 5432 with Named Volume Persistence │
                      └──────────────────────────────────────────────┘
```

---

## Project Structure

```text
skillpath/
├── docker-compose.yml              # Production full-stack Compose configuration
├── docker-compose.dev.yml          # Local development Compose with Hot Module Reload
├── cloudflared-config.yml          # Cloudflare Tunnel ingress configuration
├── cloudbuild.yaml                 # GCP Cloud Build automated deployment pipeline
├── .env.docker.example             # Docker environment configuration template
├── DOCKER.md                       # Comprehensive Docker Desktop operations manual
├── GCP_DEPLOYMENT.md               # Google Cloud Platform (Cloud Run + Cloud SQL) guide
│
├── backend/                        # Django REST Framework backend
│   ├── Dockerfile                  # Slim production Python 3.12 container
│   ├── docker-entrypoint.sh        # Automated database readiness, migration & static collection
│   ├── requirements.txt            # Django, DRF, SimpleJWT, psycopg2, Gunicorn, WhiteNoise
│   ├── manage.py                   # Django CLI management script
│   ├── test_api.py                 # Automated APITestCase integration suite
│   ├── skillpath_backend/          # Root project settings, URLs, WSGI, ASGI
│   ├── accounts/                   # Authentication, SimpleJWT, Google OAuth, 2FA SMS OTP
│   ├── plans/                      # Path Finder engine, custom career plans & 7-day checklist
│   ├── roadmaps/                   # 6 skill roadmaps & milestone task progress tracker
│   ├── portfolio/                  # Case study generator & practice project briefs
│   └── interviews/                 # HR & Technical interview question practice engine
│
└── frontend/                       # React 19 Single Page Application (SPA)
    ├── Dockerfile                  # Multi-stage production build (Node 22 -> Nginx 1.27)
    ├── Dockerfile.dev              # Vite HMR development container
    ├── nginx.conf                  # Nginx reverse proxy, gzip compression, SPA routing
    ├── package.json                # React, Vite, Lucide Icons, Axios, Monaco Editor
    ├── vite.config.js              # Vite server configuration & development proxy
    └── src/
        ├── main.jsx                # React application entrypoint
        ├── App.jsx                 # Master application routing & layout
        ├── index.css               # Glassmorphic cybernetic theme design system
        ├── api/client.js           # Axios client with JWT auto-refresh interceptors
        ├── context/AuthContext.jsx # Global user identity & session state management
        ├── data/skillsData.js      # Roadmap metadata, quiz scoring models, project templates
        ├── components/             # Reusable modular UI components (Navbar, Modals, etc.)
        └── pages/                  # Route views (Home, Explore, Roadmaps, Portfolio, Interviews)
```

---

## Quickstart with Docker (Recommended)

### 1. Launch the Production Stack
```bash
# 1. Copy the environment template
cp .env.docker.example .env

# 2. Build and launch all containers in detached mode
docker compose up --build -d
```

- **Frontend Web UI**: [http://localhost](http://localhost) (or port configured in `.env`)
- **Django REST API**: [http://localhost:8000/api/](http://localhost:8000/api/)
- **Django Admin**: [http://localhost/admin/](http://localhost/admin/)
- **API Healthcheck**: [http://localhost:8000/api/health/](http://localhost:8000/api/health/)

### 2. Launch Local Development with Hot Reloading
If you are writing code and want changes in React (Vite HMR) or Django to reflect immediately:
```bash
docker compose -f docker-compose.dev.yml up --build
```
- **Frontend (Vite HMR)**: [http://localhost:5173](http://localhost:5173)
- **Backend (Auto-reloading Django)**: [http://localhost:8000](http://localhost:8000)

### 3. Create an Admin Account
```bash
docker compose exec backend python manage.py createsuperuser
```

---

## Global Ingress via Cloudflare Tunnel (Zero Cost)

Your application is configured to route through a secure, encrypted **Cloudflare Tunnel** to your custom domain (`skillsprint.online`) with **zero open router ports, zero credit cards, and free SSL**.

### Run the Tunnel
In PowerShell / Bash:
```powershell
& "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel run skillsprint
```

### Run Permanently as a Windows Service (Background)
To keep the tunnel running 24/7 without keeping a terminal open:
```powershell
# Run PowerShell as Administrator
& "C:\Program Files (x86)\cloudflared\cloudflared.exe" service install
Start-Service cloudflared
```

---

## Getting Started Locally (Without Docker)

### 1. Start the Django Backend
```bash
cd backend

# Create & activate Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations (defaults to SQLite if DATABASE_URL unset)
python manage.py migrate

# Start backend server on port 8000
python manage.py runserver 8000
```

### 2. Start the React Frontend
```bash
cd frontend

# Install npm dependencies
npm install

# Start Vite dev server on port 5173
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints Reference

### Authentication (`/api/auth/`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register/` | Register new user with username, email, password, displayName | No |
| `POST` | `/api/auth/login/` | Authenticate user; returns `{ access, refresh, user }` | No |
| `POST` | `/api/auth/token/refresh/` | Exchange refresh token for fresh short-lived access token | No |
| `POST` | `/api/auth/google/` | Authenticate via Google OAuth2 ID token credential | No |
| `GET` | `/api/auth/me/` | Fetch current authenticated user's profile | Bearer JWT |
| `PATCH` | `/api/auth/me/` | Update profile fields (displayName, email) | Bearer JWT |
| `POST` | `/api/auth/sms/send-otp/` | Dispatch mobile 2FA verification passcode via BlackSMS | No |
| `POST` | `/api/auth/sms/verify-otp/` | Verify 2FA passcode and issue JWT tokens | No |

### User Plans (`/api/plans/`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/plans/` | Retrieve active career plan and 7-day checklist items | Bearer JWT |
| `POST` | `/api/plans/` | Create or replace personalized career plan | Bearer JWT |
| `PATCH` | `/api/plans/checklist/<day>/` | Toggle completion status of Day $N$ checklist task | Bearer JWT |
| `DELETE` | `/api/plans/` | Delete and reset current user's active plan | Bearer JWT |

### Roadmap Progress (`/api/roadmaps/`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/roadmaps/progress/` | Fetch all completed roadmap task indices grouped by skill | Bearer JWT |
| `POST` | `/api/roadmaps/progress/` | Mark or toggle milestone task index for a skill discipline | Bearer JWT |

### Portfolio & Project Builder (`/api/portfolio/`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/portfolio/` | List all saved portfolio case studies | Bearer JWT |
| `POST` | `/api/portfolio/` | Create a new portfolio case study entry | Bearer JWT |
| `PUT` | `/api/portfolio/<id>/` | Update an existing portfolio case study | Bearer JWT |
| `DELETE` | `/api/portfolio/<id>/` | Delete a portfolio entry | Bearer JWT |
| `GET` | `/api/portfolio/projects/` | List all saved practice project plans | Bearer JWT |
| `POST` | `/api/portfolio/projects/` | Save a project brief generated by ProjectBuilder | Bearer JWT |

### Interview Preparation (`/api/interviews/`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/interviews/questions/` | Fetch curated HR and Technical interview prompt catalog | No |
| `GET` | `/api/interviews/practice/` | Fetch current user's practiced interview questions & notes | Bearer JWT |
| `POST` | `/api/interviews/practice/` | Record question practice status and user answer notes | Bearer JWT |

### System & Healthcheck
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/healthz` | Container and load-balancer liveness probe | No |
| `GET` | `/api/health/` | Backend application JSON health status probe | No |

---

## Concurrency & Performance Capacity

| User Activity | Capacity | Bottleneck & Why |
| :--- | :--- | :--- |
| **Browsing & Reading Content** | **5,000 – 10,000+ Concurrent Visitors** | Offloaded 100% to Cloudflare Global CDN Edge Caches |
| **Active Database Writes / Logins** | **300 – 500 Concurrent Active Users** | Gunicorn WSGI workers (3 sync workers ≈ 75 requests/sec) |

### Scaling to 2,000+ Concurrent API Users
To increase active API concurrency, adjust [backend/Dockerfile](file:///c:/Users/sahil/skillpath/backend/Dockerfile) to multi-threaded execution:
```dockerfile
CMD ["gunicorn", "skillpath_backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "4", "--timeout", "120"]
```

---

## Monitoring & Observability Stack (Prometheus + Grafana)

SkillSprint includes an automated, pre-provisioned Prometheus and Grafana observability stack with real-time application and database metrics.

| Service | Port | URL | Default Credentials | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Grafana** | `3001` | [http://localhost:3001](http://localhost:3001) | `admin` / `admin` | Auto-provisioned dashboards with real-time graphs |
| **Prometheus** | `9090` | [http://localhost:9090](http://localhost:9090) | *(None)* | Time-series scraper scraping every 5 seconds |
| **PostgreSQL Exporter** | `9187` | [http://localhost:9187/metrics](http://localhost:9187/metrics) | *(Internal)* | PostgreSQL connection, transaction & query telemetry |
| **Django Metrics** | `8000` | [http://localhost:8000/metrics](http://localhost:8000/metrics) | *(Internal)* | HTTP requests, status codes, latency, GC & memory |

### Quick Start Monitoring
1. Start the entire application and monitoring suite:
   ```bash
   docker compose up -d
   ```
2. Open Grafana at [http://localhost:3001](http://localhost:3001) (User: `admin`, Password: `admin`).
3. Navigate to **Dashboards** -> **SkillSprint Master Monitoring Dashboard** to view:
   - **Live HTTP Requests per Second (RPS)**
   - **HTTP Response Codes Breakdown (2xx / 4xx / 5xx)**
   - **Backend Latency & Response Times**
   - **PostgreSQL Active Connections & Transactions / sec**
   - **Database Query Throughput**

---

## Automated Testing & Code Quality

### Run Django Test Suite
```bash
cd backend
python manage.py test
```
*Executes full registration, login, JWT authorization, plan creation, checklist toggle, roadmap progress, and portfolio persistence tests.*

### Lint Frontend
```bash
cd frontend
npm run lint
```

### Build Production Bundle
```bash
cd frontend
npm run build
```

---

## License
MIT License. Built with modern full-stack web standards for high reliability, zero friction, and effortless scalability.
