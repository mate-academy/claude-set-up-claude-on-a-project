# Notes

## CLAUDE.md

I included a one-line project description, the three npm commands I use constantly (`dev`, `test`, `lint`), conventions Claude can't infer reliably from a glance (CommonJS, double quotes, one route file per resource, all data access through `db/store.js`, the error response shape, a test for every endpoint), and a short architecture map.

I left out anything obvious from the code (the list of endpoints, what Express is), the in-depth README content, one-off tasks, and anything sensitive such as `.env` values or connection strings. A short file gets read and followed; a long one dilutes the rules that matter.

## Permissions (`.claude/settings.json`)

- **allow** `npm test` and `npm run lint`: safe, read-only, and run constantly, so prompts would just be noise.
- **ask** `git push`: pushing is outward-facing, so I want to confirm each time.
- **deny** reading `.env` (and `.env.*.local`) and force-pushing (`--force` / `-f`).

Without the `.env` deny rule, Claude could read real secrets (DB URLs, API keys) into the conversation, where they are sent to the model provider and may end up in logs or transcripts. Without the force-push deny rule, a mistaken command could overwrite remote history and destroy teammates' work.

## Verification

In a fresh session, `/memory` shows `CLAUDE.md` loaded and `/permissions` lists the allow / ask / deny rules above. Asking "How do I run the tests here?" is answered from `CLAUDE.md` (`npm test`).
