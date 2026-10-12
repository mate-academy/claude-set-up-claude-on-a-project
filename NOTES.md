CLAUDE.md first created using /init



Trimmed one-line description

Removed line - `node --test tests/users.test.js` — run a single test file

as already referenced in line above.

Removed line - `npm install` — install dependencies

Removed - CommonJS (`require` / `module.exports`), not ES modules — ESLint is set to `sourceType: "script"`.

Removed - Error responses are JSON shaped `{ error: "message" }` with the proper status (400 validation, 404 missing).

Removed - Tests use `node:test` + `node:assert` + `supertest` against the exported `app`; put them in `tests/\*.test.js`.

Removed - Unused args must be named `\_`, `req`, `res`, or `next` to avoid lint warnings.

\- Config comes from env vars; `.env` is git-ignored — add new keys to `.env.example`, never commit real secrets.



In permissions I've allowed Bash(npm run dev)
The following commands were verified: /memory showsCLAUDE.md loaded and /permissions shows the rules.

