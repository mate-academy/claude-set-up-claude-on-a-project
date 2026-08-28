# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- Maintainers: keep this file current. Each section carries an HTML comment
     explaining its purpose and when to update it. Delete a comment once the
     section is self-evident from real content. Structure: Commands ->
     Conventions -> Architecture. -->

## Status

<!-- One-paragraph snapshot of where the repo actually is. Update on every
     structural change (new build system, first tests, first service). -->
Starter Express (Node.js) REST API. Exposes user management (`/users`) and a
liveness check (`/health`) over an in-memory data store. Tested with Node's
built-in test runner; linted with ESLint; CI runs on GitHub Actions.
Production is hosted on Cloudflare (see Technology Architecture below).

## Commands

<!-- Only list commands that exist and work today (from package.json scripts).
     Add build/deploy commands as they land. -->
- Install deps: `npm install`
- Run in watch mode (dev): `npm run dev`   <!-- node --watch server.js -->
- Run once: `npm start`                    <!-- node server.js, PORT env, default 3000 -->
- Test (all): `npm test`                   <!-- node --test, runs tests/*.test.js -->
- Test (single file): `node --test tests/users.test.js`
- Lint: `npm run lint`                      <!-- eslint . -->

## Conventions

<!-- HOW work is done here: coding style, structure rules, testing expectations.
     Add a rule only once it is actually followed; an unenforced convention is
     noise. These are inferred from the current code, keep them true. -->
- **CommonJS modules** (`require`/`module.exports`), not ESM.
- **One router per resource** in `routes/`, mounted by path in `server.js`
  (`app.use("/users", ...)`). Add a new resource as its own router file.
- **All data access goes through `db/store.js`.** Routes never touch the data
  array directly; they call store functions. Keep that boundary.
- **App is importable, not self-starting.** `server.js` exports `app` and only
  calls `listen()` under `require.main === module`, so tests import the app
  without binding a port. Preserve this when editing startup.
- **Tests** use `node:test` + `assert` + `supertest` against the imported app;
  one behaviour per `test()`. CI (lint + test) must pass on Node 22.
- **Config via env vars** (e.g. `PORT`); real secrets live in git-ignored
  `.env` (template in `.env.example`), never committed.

## Architecture (TOGAF)

<!-- Structured per TOGAF's four architecture domains (BDAT): Business, Data,
     Application, Technology. Each domain answers a different "what" so work
     slots into the right layer. Keep each describing current reality. -->

### Business Architecture
<!-- WHAT the system is for: capabilities, actors, value streams. -->
- **Capability:** manage users (list, fetch, create) and report service
  liveness. Serves as the reference API for the Claude Code course projects.
- **Actors:** API clients / course learners calling the HTTP endpoints.

### Data Architecture
<!-- WHAT data exists and how it flows: entities, system of record, stores. -->
- **Entity:** `User { id: number, name: string, email: string }`.
- **System of record:** in-memory array in `db/store.js`, seeded with two
  users, `id` auto-incremented on create. **Not persistent** — state resets on
  every server restart. This module is the intended seam for a real store
  (e.g. Cloudflare D1 for SQL, or KV) when persistence is needed.

### Application Architecture
<!-- WHAT the software is: components, responsibilities, how they interact. -->
- **`server.js`** — composition root: creates the Express app, adds
  `express.json()` body parsing, mounts the resource routers.
- **`routes/users.js`** — `/users`: GET list, GET `:id` (404 when missing),
  POST create (400 when `name`/`email` missing, else 201). Validation lives
  here; storage is delegated to the store.
- **`routes/health.js`** — `/health`: GET returns `{ status: "ok" }`.
- **`db/store.js`** — data-access boundary: `getAllUsers`, `getUserById`,
  `createUser`. The only module that owns user state.

### Technology Architecture
<!-- WHAT it runs on: runtime, platform, deployment, CI. Cloudflare specifics
     live here. Keep concrete and current. -->
- **Runtime:** Node.js (CI pins Node 22), Express 4.
- **Hosting / production:** Cloudflare. Record the specific products as they
  are adopted — Workers (compute), Pages (static/frontend), D1 (SQL), KV
  (key-value), R2 (object storage), Durable Objects (stateful). When a deploy
  path is set up, note the command (e.g. `wrangler deploy`) and where
  `wrangler.jsonc` lives. (An Express app targeting Workers typically runs via
  an adapter; capture that choice here once made.)
- **CI:** GitHub Actions (`.github/workflows/ci.yml`) — `npm install`, lint,
  test on push and pull_request.
- **Config:** environment variables; `.env` is git-ignored.
