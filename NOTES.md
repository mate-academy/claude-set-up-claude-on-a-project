# NOTES.md

## CLAUDE.md

Kept:
- A one-line description of the project.
- **Commands** — `npm run dev`/`start`/`test`/`lint`, how to run a single test file, and what CI runs.
- **Architecture** — the `server.js` entry point's `require.main === module` guard (needed for supertest), the one-router-per-resource layout in `routes/`, and `db/store.js` as the single data-access layer.
- **Conventions** — how routes return JSON errors directly instead of using error middleware, and the pattern to follow when adding a new resource.
- **Audience** — a note that I'm an experienced developer unfamiliar with this specific stack (JS/Node/Express), so Claude explains stack-specific idioms rather than general programming concepts.

Left out:
- Anything already obvious from opening a single file (e.g. "uses Express", file listing) — no point paying context budget to restate it.
- The course assignment instructions from README.md — irrelevant to future coding sessions on this codebase.
- Generic advice like "write tests" or "don't commit secrets" — not specific to this repo.

## .claude/settings.json

- `allow`: `npm test` and `npm run lint` — safe, side-effect-free commands I run constantly; no reason to be asked every time.
- `ask`: `git push` — not destructive, but visible to others, so I want a confirmation prompt each time rather than blanket allow or deny.
- `deny`: reading `.env` (keeps real secrets out of context even if I paste an insecure prompt) and `git push --force` (rewrites shared history; without this rule, an agent following a bad instruction — or a prompt injection — could force-push over teammates' work with no confirmation).

Without the deny rule specifically, the main risk is an accidental or induced `git push --force` silently discarding remote commits, since `ask` rules can be talked past in ways an explicit `deny` cannot.
