\# Notes



\## CLAUDE.md: what I kept and what I cut



I started from the `/init` draft and kept four parts: a one-line description,

Commands (dev, test, single test file, lint), Conventions and Architecture.

The conventions are rules Claude can't reliably guess from one file:

CommonJS instead of ES modules, one router per resource in `routes/`,

all data access through `db/store.js`, the `{ error }` JSON shape,

and tests that import `app` via supertest without calling `listen()`.



I cut the generic header line, the `--test-name-pattern` command (rarely needed),

the CI note and the `PORT` override (both easy to find in the code),

and the "never read .env" line - that belongs in a deny rule, which is

actually enforced, while CLAUDE.md is only guidance. CLAUDE.md is loaded into

every session, so every extra line costs context and dilutes the rules that matter.



\## Permission rules



\- allow: `npm test` and `npm run lint` - safe, read-only, run constantly,

&#x20; so Claude shouldn't have to ask each time.

\- ask: `git push` - it publishes code, so I want to confirm every push.

\- deny: reading `./.env`, and `git push --force` / `git push -f`.



Without the `.env` deny rule Claude could read real secrets into the

conversation, where they could end up in logs or in generated code.

Without the force-push rule it could rewrite remote history and lose commits.

I blocked both `--force` and `-f`, because blocking only one form leaves the other open.



\## Verification



In a fresh session `/memory` showed "Project instructions - Checked in at ./CLAUDE.md",

`/permissions` listed my allow / ask / deny rules, and "How do I run the tests here?"

was answered with `npm test` straight from CLAUDE.md, without opening any files.

