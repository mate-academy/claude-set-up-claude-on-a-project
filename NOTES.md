# Notes

## CLAUDE.md
**Included:** a one-line project description, the three npm commands, a short architecture section (`server.js` entry point, one router per resource, data only via `db/store.js`), and conventions taken from the actual code: CommonJS, error shape `{ error }` with specific status codes, `Number()` on ids, the route comment style, and the `node:test` + `supertest` testing approach. These are things Claude would otherwise have to infer or could get wrong (e.g. writing ESM imports or reaching for Jest).

**Left out:** the full endpoint list, the README's course instructions, and anything derivable by reading a 30-line file. Also no secrets, no env values, and no one-off tasks. Shorter files get followed more reliably.

## Permissions (`.claude/settings.json`)
- **allow:** `npm test` and `npm run lint` — safe, local, and run constantly, so prompts would be pure friction.
- **ask:** `git push` — outward-facing, so I confirm each time.
- **deny:** `Read(./.env)` and `git push --force`. Without the `.env` rule, Claude could read real secrets (DB URLs, API keys) into the conversation context, where they could be sent to the model or echoed into logs and commits. Without the force-push rule, a mistaken command could overwrite shared history on the remote.

## Other fix
`.gitignore` had leading spaces on every line after `node_modules/`, which git treats as part of the pattern, so `.env` and `.claude/settings.local.json` were **not** actually ignored. I removed the indentation so the secrets protection works.

## Verification
`/memory` should list `CLAUDE.md` as loaded and `/permissions` should show the allow/ask/deny rules above; I haven't been able to run these interactive commands from within this session, so please confirm them in a fresh session.
