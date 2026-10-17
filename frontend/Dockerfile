# =============================================================================
# SkillSprint Frontend Multi-Stage Dockerfile (Vite React + Nginx)
# =============================================================================

# ── Stage 1: Build production React bundle ───────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package.json package-lock.json ./

# Install npm dependencies cleanly
RUN npm ci

# Copy frontend source code
COPY . .

# Build-time environment arguments (optional overrides for custom API host)
ARG VITE_API_URL=""
ARG VITE_GOOGLE_CLIENT_ID=""
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

# Build static SPA assets into /app/dist
RUN npm run build

# ── Stage 2: High-performance Nginx production web server ────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx html placeholders
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose web server port
EXPOSE 80

# Container healthcheck
HEALTHCHECK --interval=20s --timeout=3s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
