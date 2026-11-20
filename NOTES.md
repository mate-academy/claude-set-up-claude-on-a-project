# Notes

## CLAUDE.md

I included a one-line project description, the three npm commands, five conventions that Claude can follow without asking (CommonJS, data access only via `db/store.js`, error response shape, supertest against the exported `app`, config via `process.env`), and a short architecture map (`server.js`, `routes/`, `db/store.js`, `tests/`).

I left out anything Claude can read from the code itself (the list of endpoints, the sample user data), the README's setup walkthrough, and anything sensitive such as values from `.env`. I also left out one-off tasks. Every line should save a question or prevent a mistake, and a short file is more likely to be followed.

## Permissions (`.claude/settings.json`)

- **allow**: `npm test` and `npm run lint`. They are safe, local and run constantly, so prompting each time is just friction.
- **ask**: `git push`, so I confirm before anything leaves my machine.
- **deny**: reading `.env` (and `.env.*.local`), and force-push (`--force` / `-f`).

Without the `.env` deny rule, Claude could read real secrets (API keys, DB credentials) into the conversation context, from where they could be sent to the model provider or echoed into logs and generated files. Without the force-push deny rule, a mistaken command could overwrite remote history and destroy teammates' commits.

## Verification

In a fresh session, `/memory` shows `CLAUDE.md` as loaded and `/permissions` lists the allow, ask and deny rules above. *(Confirm this yourself before submitting; I could not run these interactive commands for you.)*
