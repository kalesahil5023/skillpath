-- SkillSprint PostgreSQL Schema
-- Run: psql $DATABASE_URL -f db/schema.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name  VARCHAR(100),
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- User plans (migrated from localStorage "skillpath_my_plan")
CREATE TABLE IF NOT EXISTS user_plans (
    id                SERIAL PRIMARY KEY,
    user_id           INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path              VARCHAR(50) NOT NULL,
    recommended_skill VARCHAR(160) NOT NULL,
    reason            TEXT NOT NULL,
    time_commitment   VARCHAR(50) NOT NULL,
    goal              VARCHAR(50) NOT NULL,
    roadmap_name      VARCHAR(80) NOT NULL,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Plan checklist items (the 7-day starter plan)
CREATE TABLE IF NOT EXISTS plan_checklist (
    id         SERIAL PRIMARY KEY,
    plan_id    INT NOT NULL REFERENCES user_plans(id) ON DELETE CASCADE,
    day_number SMALLINT NOT NULL CHECK (day_number BETWEEN 1 AND 7),
    task       TEXT NOT NULL,
    completed  BOOLEAN DEFAULT FALSE,
    UNIQUE(plan_id, day_number)
);

-- Roadmap progress (migrated from localStorage "skillpath_roadmap_progress_v1:*")
CREATE TABLE IF NOT EXISTS roadmap_progress (
    id           SERIAL PRIMARY KEY,
    user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill        VARCHAR(80) NOT NULL,
    task_index   SMALLINT NOT NULL,
    completed    BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, skill, task_index)
);

-- Portfolio entries (from portfolio builder)
CREATE TABLE IF NOT EXISTS portfolio_entries (
    id          SERIAL PRIMARY KEY,
    user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    skills_used VARCHAR(180),
    tools_used  VARCHAR(180),
    outcome     TEXT,
    project_url VARCHAR(300),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Project plans (from project builder)
CREATE TABLE IF NOT EXISTS project_plans (
    id           SERIAL PRIMARY KEY,
    user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill        VARCHAR(80) NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    title        VARCHAR(100) NOT NULL,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Refresh tokens (for JWT rotation)
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id         SERIAL PRIMARY KEY,
    user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked    BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_roadmap_progress_user_skill ON roadmap_progress(user_id, skill);
CREATE INDEX IF NOT EXISTS idx_plan_checklist_plan ON plan_checklist(plan_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash ON refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_portfolio_entries_user ON portfolio_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_project_plans_user ON project_plans(user_id);
