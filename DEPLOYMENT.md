# Production Deployment Guide: SkillSprint (React + Django + PostgreSQL)

This guide covers step-by-step production deployment for the redesigned SkillSprint full-stack application.

---

## Architecture Overview

- **Frontend**: React (Vite Single Page App) → Hosted on **Render Static Site**, **Vercel**, or **Netlify**
- **Backend**: Django 5.x REST Framework + Gunicorn → Hosted on **Render Web Service**, **Railway**, or **VPS**
- **Database**: Managed **PostgreSQL** → Hosted on **Render PostgreSQL**, **Supabase**, or **Neon**

---

## Method 1: Deploying on Render (Recommended)

Render offers free-tier hosting for all three layers under one dashboard.

```
[User Browser]
      │
      ├──> Render Static Site (React Frontend: https://skillsprint.onrender.com)
      │         │
      │         ▼ (Axios with JWT Bearer token)
      └──> Render Web Service (Django API: https://skillsprint-api.onrender.com/api/)
                │
                ▼
           Render PostgreSQL Database (DATABASE_URL)
```

---

### Step 1: Provision a Managed PostgreSQL Database

1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → Select **PostgreSQL**.
3. Configure the database:
   - **Name**: `skillsprint-db`
   - **Database**: `skillsprint`
   - **User**: `skillsprint_user`
   - **Region**: Choose the region closest to your users (e.g. *Oregon*, *Frankfurt*, or *Singapore*).
   - **Plan**: Select **Free** (or Starter for high uptime).
4. Click **Create Database**.
5. Once provisioned, copy the **Internal Database URL** (if backend is on Render) or **External Database URL**.

---

### Step 2: Deploy the Django Backend Web Service

1. On your Render Dashboard, click **New +** → Select **Web Service**.
2. Connect your GitHub repository: `kalesahil5023/skillpath`.
3. Configure the service settings:
   - **Name**: `skillsprint-api`
   - **Region**: *Same region as your database*
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**:
     ```bash
     pip install -r requirements.txt && python manage.py migrate
     ```
   - **Start Command**:
     ```bash
     gunicorn skillpath_backend.wsgi:application --bind 0.0.0.0:$PORT
     ```
4. Scroll down to **Environment Variables** and add the following:
   | Key | Value | Notes |
   |---|---|---|
   | `DATABASE_URL` | *Paste your PostgreSQL Database URL from Step 1* | Render auto-configures connection |
   | `DJANGO_SECRET_KEY` | *Generate a 50+ character random string* | e.g. run `python -c "import secrets; print(secrets.token_urlsafe(50))"` |
   | `DEBUG` | `False` | Disables debug mode in production |
   | `ALLOWED_HOSTS` | `*` or `skillsprint-api.onrender.com` | Allowed backend hostnames |
   | `PYTHON_VERSION` | `3.13.0` | Ensures modern Python runtime |
5. Click **Create Web Service**.
6. Wait for the build and migration to finish. Your backend API will be live at:
   `https://skillsprint-api.onrender.com`

---

### Step 3: Deploy the React Frontend Static Site

1. On your Render Dashboard, click **New +** → Select **Static Site**.
2. Connect your GitHub repository: `kalesahil5023/skillpath`.
3. Configure the site settings:
   - **Name**: `skillsprint`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://skillsprint-api.onrender.com` *(Your backend URL from Step 2)* |
5. Under **Redirects / Rewrites** (Important for React Single Page Apps):
   - Click **Add Rule**
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Create Static Site**.

Once the build finishes, your application is live at `https://skillsprint.onrender.com`!

---

## Method 2: Deploying Frontend on Vercel + Backend on Render

If you prefer Vercel for the React frontend:

### Deploy Frontend on Vercel
1. Import `kalesahil5023/skillpath` into [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework Preset will auto-detect as **Vite**.
4. Add Environment Variable:
   - `VITE_API_URL` = `https://skillsprint-api.onrender.com`
5. Click **Deploy**.

---

## Method 3: Deploying on a Self-Hosted Linux VPS (Ubuntu 22.04 / 24.04)

For complete control and lowest cost:

### 1. Server Prerequisites
```bash
sudo apt update && sudo apt install -y python3-pip python3-venv postgresql postgresql-contrib nginx certbot python3-certbot-nginx git curl
```

### 2. Configure PostgreSQL
```bash
sudo -u postgres psql
CREATE DATABASE skillsprint;
CREATE USER skillsprint_user WITH PASSWORD 'StrongPassword123!';
GRANT ALL PRIVILEGES ON DATABASE skillsprint TO skillsprint_user;
\q
```

### 3. Clone Repository and Setup Backend
```bash
cd /var/www
sudo git clone https://github.com/kalesahil5023/skillpath.git
cd skillpath/backend

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create production .env
cat << 'EOF' > .env
DATABASE_URL=postgresql://skillsprint_user:StrongPassword123!@localhost:5432/skillsprint
DJANGO_SECRET_KEY=generate-a-secure-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,api.yourdomain.com,127.0.0.1
EOF

python manage.py migrate
python manage.py collectstatic --noinput
```

### 4. Setup Gunicorn Systemd Service
Create `/etc/systemd/system/skillsprint-backend.service`:
```ini
[Unit]
Description=SkillSprint Django Gunicorn Daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/skillpath/backend
ExecStart=/var/www/skillpath/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind 127.0.0.1:8000 \
          skillpath_backend.wsgi:application

[Install]
WantedBy=multi-user.target
```
Start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl start skillsprint-backend
sudo systemctl enable skillsprint-backend
```

### 5. Build React Frontend
```bash
cd /var/www/skillpath/frontend
npm install
VITE_API_URL=https://api.yourdomain.com npm run build
```

### 6. Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/skillsprint`:
```nginx
# Frontend SPA
server {
    server_name yourdomain.com;
    root /var/www/skillpath/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Enable site and add SSL:
```bash
sudo ln -s /etc/nginx/sites-available/skillsprint /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

---

## Production Verification Checklist

- [ ] **Database Connection**: Verify migrations ran without errors (`python manage.py migrate`).
- [ ] **Authentication Flow**: Test registering a user on the live frontend and logging in.
- [ ] **Token Persistence**: Reload the page to verify the session remains authenticated.
- [ ] **Cloud Sync**: Complete the Path Finder quiz, click "Save to My Plan (Cloud Sync)", and verify the checklist displays with the *"Synced to Cloud"* badge.
- [ ] **Roadmap Completion**: Inspect and complete tasks to confirm task state updates in PostgreSQL.
- [ ] **CORS**: Verify no CORS errors appear in the browser console.
- [ ] **HTTPS / SSL**: Ensure both frontend and backend are served over HTTPS.
