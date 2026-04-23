# AGENTS.md

## Overview

This boilerplate is an AdonisJS 7 API-only application written in TypeScript.

Core stack:

- AdonisJS 7
- Lucid ORM
- PostgreSQL
- Oxlint and Oxfmt for static checks and formatting

## Purpose Of This Document

This file is a practical runbook for AI agents working in this repository.

Use it to:

- boot and verify a local environment,
- reset and seed the database safely,
- run the development stack,
- run lint/format/type checks,
- run test suites,
- recover quickly from common setup failures.

If a command in this file conflicts with scripts in `package.json` or the `scripts/` directory, always trust the scripts as source of truth.

## Project Baseline

- Node.js: `>= 20`
- Package manager: `pnpm`
- Database: PostgreSQL
- Optional local email preview: Mailcatcher via Docker
- Optional process manager used by scripts: Foreman (installed automatically by `./scripts/dev` via RubyGems if missing)

## First-Time Local Setup

### 1. Install dependencies

Run from repository root:

```bash
pnpm install
```

### 2. Prepare environment files

Use `.env.example` as the template for development values.

Typical flow:

```bash
cp .env.example .env
```

Required variables include:

- `APP_KEY`
- `NODE_ENV`
- `HOST`
- `PORT`
- `LOG_LEVEL`
- `SESSION_DRIVER`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_DATABASE`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `DEFAULT_FROM_EMAIL`

Notes:

- For local development, `NODE_ENV=development`.
- For tests, this project already uses `.env.test` with `NODE_ENV=test` and a separate database (`DB_DATABASE=adonisjs_boilerplate_test`).

### 3. Create PostgreSQL databases

Create both development and test databases.

Example using `psql`:

```sql
CREATE DATABASE adonisjs_boilerplate;
CREATE DATABASE adonisjs_boilerplate_test;
GRANT ALL PRIVILEGES ON DATABASE adonisjs_boilerplate TO developer;
GRANT ALL PRIVILEGES ON DATABASE adonisjs_boilerplate_test TO developer;
```

Adjust names/user to match your `.env` and `.env.test` values.

### 4. Initialize schema and seed data

Recommended:

```bash
./scripts/reset-db
```

What this script does:

1. `NODE_ENV=development pnpm install`
2. `node ace migration:fresh`
3. `node ace migration:status`
4. `node ace db:seed`

Use this script when you need a clean development database.

## Development Workflow

### Preferred command

```bash
./scripts/dev
```

What it does:

1. Ensures `foreman` is available (`gem install foreman` if needed).
2. Kills processes on port `3333` before restart.
3. Runs `NODE_ENV=development pnpm install`.
4. Starts services from `Procfile.dev`:
	- `api`: runs Adonis server (`pnpm run dev`)
	- `mailcatcher`: runs dockerized Mailcatcher on ports `1080` and `1025`

### Direct API command (without Foreman)

```bash
pnpm run dev
```

This runs:

```bash
NODE_ENV=development PORT=3333 HOST=localhost node ace serve --watch --no-clear
```

### Mail preview

When `./scripts/dev` is running, Mailcatcher UI is available at:

- `http://0.0.0.0:1080/`

## Code Quality Commands

Run from repository root.

### Lint

- Check only:

```bash
pnpm run lint
```

- Auto-fix where possible:

```bash
pnpm run lint:fix
```

### Format

- Apply formatting:

```bash
pnpm run format
```

- Check formatting only:

```bash
pnpm run format:check
```

### Type checking

```bash
pnpm run typecheck
```

## Testing Workflow

### Recommended test entrypoint

```bash
./scripts/test
```

What this script does:

1. `pnpm install`
2. `NODE_ENV=test node ace migration:fresh`
3. `node ace test`

This guarantees the test database schema is rebuilt before running tests.

### Direct test command

```bash
pnpm test
```

Equivalent to:

```bash
node ace test
```

Use direct command when DB is already prepared and you only need quick re-runs.

## Recommended CI-Like Local Check Sequence

Before opening or updating a PR, run:

```bash
pnpm install
pnpm run lint
pnpm run format:check
pnpm run typecheck
./scripts/test
```

If you prefer auto-fix first:

```bash
pnpm run lint:fix
pnpm run format
pnpm run typecheck
./scripts/test
```

## Troubleshooting

### Database connection errors

- Verify PostgreSQL is running.
- Verify `.env` and `.env.test` DB values match created databases.
- Re-run `./scripts/reset-db` for development.
- Re-run `./scripts/test` for test environment.

### Port 3333 already in use

- `./scripts/dev` already attempts to kill port `3333`.
- If still blocked, manually free the port and retry.

### Foreman not available

- The dev script tries to install it automatically with `gem install foreman`.
- Ensure RubyGems is available in the local machine environment.

### Mail not visible in development

- Confirm `mailcatcher` process is running from `Procfile.dev`.
- Confirm SMTP settings in `.env` target Mailcatcher (`SMTP_HOST`, `SMTP_PORT=1025`).
- Open `http://0.0.0.0:1080/`.

## AdonisJS 7 Best Practices For Agents

Apply the following rules whenever generating, updating, or reviewing code in this repository.

### Architecture and layering

- Keep controllers thin: parse request, call domain logic, return response.
- Keep business rules out of route handlers and middleware whenever possible.
- Prefer dedicated classes/modules for reusable domain logic.
- Keep API version boundaries explicit (for example, under `app/controllers/api/v1/...`).

### Routing and HTTP behavior

- Preserve the existing route versioning and grouping strategy.
- For API endpoints, always return JSON and keep payload shapes consistent.
- Use proper HTTP status codes (`200`, `201`, `204`, `400`, `401`, `403`, `404`, `422`, `500`) based on behavior.
- Avoid silently changing response contracts without adding/updating tests.

### Validation

- Validate input at the boundary (request validators) before business logic.
- Prefer typed validators and reusable validation rules for shared constraints.
- Return predictable validation errors (especially for `422 Unprocessable Entity`).
- Never trust request payload fields that were not explicitly validated.

### Authentication and authorization

- Protect private routes with the project auth middleware.
- Keep guest-only endpoints behind guest middleware where relevant.
- Resolve the authenticated user from Adonis auth context, not from raw payload values.
- Do not leak sensitive auth information in error messages or logs.

### Database and Lucid ORM

- Prefer Lucid models/query builder over raw SQL unless absolutely required.
- Use migrations for schema changes; never patch schema manually in code.
- For destructive or stateful changes, use transactions when multiple writes must be atomic.
- Avoid N+1 queries by preloading needed relations explicitly.
- Keep seeders/factories deterministic enough for test reliability.

### Environment and configuration

- Read config from `start/env.ts`-validated environment variables.
- Never hardcode secrets, credentials, or environment-specific values.
- Keep `NODE_ENV` behavior explicit (`development` vs `test` vs `production`).
- When adding new env variables, update schema validation and documentation.

### Errors and exceptions

- Throw or map errors intentionally; avoid swallowing exceptions.
- Use centralized exception handling patterns already present in the project.
- Keep error responses stable and API-friendly.
- Log enough context to debug, but never log secrets/tokens/passwords.

### Serialization and response shaping

- Prefer transformers/serializers for API output consistency.
- Do not expose internal model fields by default (especially sensitive fields).
- Normalize date/time serialization format across endpoints.
- Keep backward compatibility in serialized response keys where possible.

### Mail and side effects

- Keep email rendering in dedicated mail classes and templates.
- Avoid sending emails directly from low-level model hooks unless intentional and tested.
- In development, target Mailcatcher-compatible SMTP settings.
- Cover user-visible mail behavior with mail tests where relevant.

### Testing expectations

- Add or update tests for every behavior change (happy path + failure path).
- Use the repository test entrypoint (`./scripts/test`) for full verification.
- Prefer functional tests for route/controller behavior and model tests for ORM rules.
- Keep tests isolated: do not depend on data created by other tests.

### Code quality and typing

- Keep TypeScript strictness intact; avoid `any` unless justified.
- Run lint, format check, and typecheck before concluding work.
- Prefer small focused changes over broad refactors unless explicitly requested.
- Avoid introducing dead code, commented-out logic, or unused imports.

### Change management for agents

- Before editing, inspect existing conventions in nearby files and mirror them.
- Do not rename public API fields/routes casually; treat as breaking changes.
- When changing DB logic, ensure migrations and tests are updated together.
- If behavior is ambiguous, choose the least breaking approach and document assumptions.

## Agent Execution Rules

When acting as an AI coding agent in this repository:

1. Prefer repository scripts over ad-hoc commands (`./scripts/dev`, `./scripts/reset-db`, `./scripts/test`).
2. Do not skip migrations when validating features touching persistence.
3. Run at least lint + typecheck + relevant tests before concluding code changes.
4. Keep environment-specific behavior explicit (`NODE_ENV=development` vs `NODE_ENV=test`).
5. Avoid destructive database operations outside local/dev/test contexts.
6. Follow the "AdonisJS 7 Best Practices For Agents" section for all code and review tasks.

## Quick Command Reference

```bash
# Install deps
pnpm install

# Reset and seed development DB
./scripts/reset-db

# Start full local development stack (API + Mailcatcher)
./scripts/dev

# Lint / format / typecheck
pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run format:check
pnpm run typecheck

# Tests
./scripts/test
pnpm test
```
