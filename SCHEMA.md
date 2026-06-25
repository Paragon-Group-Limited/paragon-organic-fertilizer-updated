# Database schema & Payload collections

## How schema stays in sync (the important bit)

The app is deployed running **`next dev`** (development mode) — see `Dockerfile.dev`.
The Postgres adapter in `src/payload.config.ts` uses `push: true`, and Payload applies
that auto-push whenever **`NODE_ENV !== 'production'`**. Because we run in dev mode,
**push is active in the deployed app**.

Consequence (the good kind): when you add a new collection or a new field and deploy,
Payload creates the missing tables/columns **automatically** on startup / first request.
You do **not** run any migration command. This is the "it just works" behaviour.

> Why dev mode and not a production build? This is a small dev/staging server. A
> production build (`next start`) disables Payload's push, which previously caused the
> admin panel to 500 with `column ... does not exist` after a new collection was added.
> Running `next dev` keeps schema sync automatic, which is what this project wants.

## Deploy pipeline

`.github/workflows/azure-deploy.yml`:

1. **build-and-push** — GitHub Actions builds `Dockerfile.dev` (just `npm ci` + copy
   source, no `next build`, so it is fast and needs no database) and pushes the image to
   `ghcr.io/paragon-group-limited/paragon-organic-fertilizer-updated`.
2. **deploy** — SSHes to the VM, takes a `pg_dump` backup into `~/backups/` (keeps the
   last 10), then `docker compose pull app && docker compose up -d`. The VM never builds.

On startup the app connects to Postgres, Payload initialises, and `push` creates any
missing schema. No manual step.

## Safety: additive vs destructive changes

`push` is **additive and safe** for the common cases — new collections, new fields
(`CREATE TABLE` / `ADD COLUMN`). It never touches existing rows for those.

Be careful when you **remove or rename** a field/collection: dev push may want to drop
or alter a column, which can lose data. For those changes:

- A fresh backup is taken automatically on every deploy (`~/backups/`), and
- review the app logs after deploy to confirm what push did.

Restore a backup if ever needed:

```bash
cat ~/backups/paragon_organic_YYYYMMDD_HHMMSS.sql \
  | docker exec -i pg-of psql -U paragon -d paragon_organic
```

## Resource note

`next dev` compiles routes on demand, so it uses more RAM than `next start` (especially
the first hit to the Payload admin). The `app` service memory limit lives in
`docker-compose.yml`; if the container gets OOM-killed under load, raise it there.
