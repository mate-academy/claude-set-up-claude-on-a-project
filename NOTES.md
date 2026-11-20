# Notes

## CLAUDE.md

I included a one-line project description, the three npm commands, five conventions Claude can follow without asking, and a short architecture map. The conventions are CommonJS, data access only via `db/store.js`, the error response shape, supertest against the exported `app`, and config via `process.env`.

I left out anything Claude can read from the code itself (endpoint list, sample data, port number), the README's setup walkthrough, and anything sensitive such as values from `.env`. I also left out one-off tasks. Every line should save a question or prevent a mistake, and a short file is more likely to be followed.

## Permissions (`.claude/settings.json`)

- **allow**: `npm test` and `npm run lint`. They are safe, local and run constantly, so prompting each time is just friction.
- **ask**: `git push`, so I confirm before anything leaves my machine.
- **deny**: reading `.env` and `.env.*` (also via `cat .env`), and force-push in its `--force`, `-f` and `--force-with-lease` forms.

Without the `.env` deny rules, Claude could read real secrets (API keys, DB credentials) into the conversation, where they might be echoed into logs or generated files. The rules are a guardrail, not a guarantee: they match specific tools and command prefixes, so an unusual shell command could still read the file. Without the force-push deny rules, a mistaken command could overwrite remote history and destroy teammates' commits.

## Verification

- `claude --version` prints `2.1.329 (Claude Code)`.
- `/memory` opens and shows the project `CLAUDE.md` as loaded.
- `/permissions` lists the allow, ask and deny rules above.
