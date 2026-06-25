# Database schema & Payload collections

## Architecture (read this before changing collections)

The app is deployed as a **production build** (`Dockerfile` → `next start`). The heavy
admin-panel compile happens during `next build` **in CI** (GitHub Actions runner, lots
of RAM), so the small VM only ever serves the pre-built app — fast and light
(~400 MB), no runtime compile, no crashes.

Payload's postgres adapter uses `push: true`, but Payload only applies push when
`NODE_ENV !== 'production'`. So the production app does **not** sync schema on its own.
We handle that with a separate, automatic step at deploy time (below) — you never run a
migration command.

## How schema syncs (automatic, every deploy)

`.github/workflows/azure-deploy.yml` deploy job, after pulling the new image:

1. Takes a `pg_dump` backup into `~/backups/` (keeps the last 10).
2. Briefly starts a **one-shot dev-mode container** from the freshly pulled image
   (`NODE_ENV=development`, mounting the current source, reusing the image's
   node_modules) and hits `http://localhost:3001/api/users`. That triggers Payload
   init → `pushDevSchema`, which creates any missing tables/columns. It compiles only a
   light API route — **not** the heavy admin UI — so it stays within the VM's RAM.
3. Removes the one-shot container.
4. Starts the production app (`docker compose up -d`) with the schema already in place.

So your workflow is just: **change a collection in code → push → merge to `main`.** The
deploy syncs the schema for you.

## Safety: additive vs destructive

`push` is additive and safe for the common cases — new collections, new fields
(`CREATE TABLE` / `ADD COLUMN`). It never touches existing rows for those.

Removing or renaming a field/collection can make push want to DROP/ALTER a column, which
can lose data. A fresh `pg_dump` backup is taken automatically before every deploy, so
you can restore:

```bash
LATEST=$(ls -1t ~/backups/paragon_organic_*.sql | head -1)
cat "$LATEST" | docker exec -i pg-of psql -U paragon -d paragon_organic
```

After a deploy that removes/renames schema, check the deploy log's
"Syncing Payload schema" section to see what push did.

## Why not run the whole app in dev mode?

We tried it. `next dev` compiles routes at runtime, and compiling the Payload admin
(lexical + puck editors + 10 collections) needs >1.25 GB — more than this 3.8 GB VM can
spare alongside its other stacks. It crash-looped (Node heap) and pages took minutes.
Production build moves that compile to CI and keeps the VM healthy.

## Why not Payload migrations?

`payload migrate:create` works locally but adds a manual step on every schema change,
and the migrate CLI fails inside the stripped runtime image (undici `Illegal
constructor`). For a fast-moving dev project the automatic deploy-time push above is
simpler. If this ever becomes a true high-stakes production DB, switch to
`push: false` + `prodMigrations: true` with committed migration files for a reviewable
history.

## Collections

`src/payload.config.ts`: Users, Media, Pages, Products, Dealers, Careers,
AppliedCandidates, HeroSlides, Orders, BlockedPhones + a SiteSettings global.
