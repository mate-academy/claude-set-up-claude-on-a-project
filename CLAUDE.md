# CLAUDE.md

Express 4 REST API over an in-memory store: `/users` (list, fetch, create) and `/health` liveness. Reference project for the Claude Code course.

## Commands

- `npm run dev` — watch mode (`node --watch server.js`); port 3000 or `$PORT`
- `npm test` — full suite (`node --test`)
- `node --test tests/users.test.js` — a single test file
- `npm run lint` — ESLint. CI runs lint + test on Node 22 and must pass.

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- One router per resource in `routes/`, mounted by path in `server.js`. A new resource is a new file, not another branch inside an existing one.
- All user state is reached through `db/store.js`. Routes call store functions and never touch the array.
- Routes own validation and status codes; the store owns data. Keep that split.
- `server.js` exports `app` and calls `listen()` only under `require.main === module`, so tests import the app without binding a port. Preserve this when editing startup.
- Tests use `node:test` + `assert` + `supertest` against the imported app, one behaviour per `test()`.
- Config comes from environment variables (`PORT`). Secrets live in git-ignored `.env`; the template is `.env.example`.

## Architecture (TOGAF BDAT)

- **Business** — one capability: manage users and report service liveness, for HTTP clients.
- **Data** — `User { id, name, email }`. `db/store.js` is the system of record: an in-memory array seeded with two users, `id` auto-incremented, wiped on restart. It is the seam where a real database would be substituted.
- **Application** — `server.js` is the composition root (JSON body parsing, mounts the routers); `routes/` holds HTTP concerns only; `db/store.js` owns state.
- **Technology** — Node 22, Express 4, no build step. CI is GitHub Actions (`.github/workflows/ci.yml`) on push and pull_request. No deployment target is configured.
