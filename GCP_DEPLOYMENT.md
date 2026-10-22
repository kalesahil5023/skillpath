# SkillSprint — Google Cloud Platform (GCP) Deployment Guide

This guide covers deploying the containerized SkillSprint full-stack application to **Google Cloud Platform (GCP)** using **Cloud Run**, **Cloud SQL (PostgreSQL)**, **Artifact Registry**, and **Secret Manager**.

---

## Recommended Architecture on GCP

```
                         Internet / Users
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │       Google Cloud Run (Frontend)            │
         │       - Nginx + React SPA Container          │
         │       - Auto-scaling (0 to N instances)      │
         │       - Managed SSL Certificate              │
         └──────────────────────┬───────────────────────┘
                                │ HTTPS / Internal API
                                ▼
         ┌──────────────────────────────────────────────┐
         │       Google Cloud Run (Backend API)         │
         │       - Django 5.x + Gunicorn Container      │
         │       - Auto-scaling (0 to N instances)      │
         │       - WhiteNoise Static Assets             │
         └──────────────────────┬───────────────────────┘
                                │ Unix Domain Socket
                                ▼
         ┌──────────────────────────────────────────────┐
         │       Google Cloud SQL (PostgreSQL 16)       │
         │       - Managed relational database          │
         │       - Automated backups & failover         │
         └──────────────────────────────────────────────┘
```

---

## 1. Prerequisites

1. Install the [Google Cloud CLI (`gcloud`)](https://cloud.google.com/sdk/docs/install).
2. Authenticate your CLI session:
   ```bash
   gcloud auth login
   ```
3. Set your active project ID:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

---

## 2. Enable Required GCP APIs

Run this command to enable all necessary services:

```bash
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com
```

---

## 3. Create Artifact Registry Repository

Create a Docker repository to store your container images:

```bash
gcloud artifacts repositories create skillsprint-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="SkillSprint Docker Repository"
```

Configure Docker to authenticate with Google Artifact Registry:
```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

---

## 4. Provision Cloud SQL (PostgreSQL 16)

### A. Create the Database Instance
```bash
gcloud sql instances create skillsprint-db \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=STRONG_DB_ROOT_PASSWORD \
  --availability-type=zonal \
  --storage-size=10GB \
  --storage-type=SSD
```

### B. Create Application Database & User
```bash
# Create application database
gcloud sql databases create skillsprint --instance=skillsprint-db

# Create dedicated application user
gcloud sql users create skillsprint_user \
  --instance=skillsprint-db \
  --password=STRONG_USER_PASSWORD
```

### C. Retrieve Instance Connection Name
```bash
gcloud sql instances describe skillsprint-db --format="value(connectionName)"
# Output format: PROJECT_ID:REGION:skillsprint-db
```
*(Save this connection name for the next step)*.

---

## 5. Store Secrets in Secret Manager

Store sensitive credentials securely:

```bash
# 1. Django Secret Key
python -c "import secrets; print(secrets.token_urlsafe(50))" | \
  gcloud secrets create DJANGO_SECRET_KEY --data-file=-

# 2. Database URL for Cloud Run
# Format: postgresql://USER:PASSWORD@/DBNAME?host=/cloudsql/INSTANCE_CONNECTION_NAME
echo -n "postgresql://skillsprint_user:STRONG_USER_PASSWORD@/skillsprint?host=/cloudsql/YOUR_INSTANCE_CONNECTION_NAME" | \
  gcloud secrets create DATABASE_URL --data-file=-
```

---

## 6. Build & Push Docker Images

From your local project root (`c:\Users\sahil\skillpath`):

```bash
# Set your variables
export PROJECT_ID=$(gcloud config get-value project)
export REGION="us-central1"
export REPO="skillsprint-repo"

# Build & Push Backend
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest ./backend
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest

# Build & Push Frontend
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest ./frontend
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest
```

---

## 7. Deploy Backend to Cloud Run

Deploy the Django REST Framework service connected to Cloud SQL:

```bash
gcloud run deploy skillsprint-backend \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest \
  --region=${REGION} \
  --platform=managed \
  --allow-unauthenticated \
  --port=8000 \
  --add-cloudsql-instances=YOUR_INSTANCE_CONNECTION_NAME \
  --set-env-vars="DEBUG=False,ALLOWED_HOSTS=*" \
  --set-secrets="DJANGO_SECRET_KEY=DJANGO_SECRET_KEY:latest,DATABASE_URL=DATABASE_URL:latest" \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=5
```

After deployment, note down the generated URL (e.g., `https://skillsprint-backend-xyz-uc.a.run.app`).

---

## 8. Run Database Migrations on Cloud Run

Execute database migrations using Cloud Run Jobs:

```bash
gcloud run jobs create migrate-job \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/backend:latest \
  --region=${REGION} \
  --set-secrets="DATABASE_URL=DATABASE_URL:latest,DJANGO_SECRET_KEY=DJANGO_SECRET_KEY:latest" \
  --set-env-vars="DEBUG=False" \
  --add-cloudsql-instances=YOUR_INSTANCE_CONNECTION_NAME \
  --command="python" \
  --args="manage.py,migrate,--noinput"

# Execute the migration
gcloud run jobs execute migrate-job --region=${REGION}
```

---

## 9. Deploy Frontend to Cloud Run

Rebuild and deploy the frontend pointing to your Cloud Run backend API:

```bash
# Build frontend with backend API URL passed into build
docker build \
  --build-arg VITE_API_URL="https://skillsprint-backend-xyz-uc.a.run.app" \
  -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest ./frontend

docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest

# Deploy to Cloud Run
gcloud run deploy skillsprint-frontend \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/frontend:latest \
  --region=${REGION} \
  --platform=managed \
  --allow-unauthenticated \
  --port=80 \
  --memory=256Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=5
```

---

## 10. Update CORS in Backend

Once the frontend URL is assigned (e.g., `https://skillsprint-frontend-xyz-uc.a.run.app`):

```bash
gcloud run services update skillsprint-backend \
  --region=${REGION} \
  --update-env-vars="CORS_ALLOWED_ORIGINS=https://skillsprint-frontend-xyz-uc.a.run.app,CSRF_TRUSTED_ORIGINS=https://skillsprint-frontend-xyz-uc.a.run.app"
```

---

## Cost Optimization on GCP

- **Cloud Run**: Configured with `--min-instances=0`, meaning it scales down to 0 instances when idle, incurring **zero compute charges** during inactivity.
- **Cloud SQL**: Using `db-f1-micro` tier (shared vCPU, 0.6 GB RAM) keeps database costs minimal (~$7–$9/month).
- **Artifact Registry**: Storage cost is pennies per month for container layers.
