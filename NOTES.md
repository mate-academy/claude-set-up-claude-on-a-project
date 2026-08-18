#what did i put in CLAUDE.md
    - A one-line Project summary (Express REST API, in-memory store, no DB/auth/frontend) so Claude doesn't assume infrastructure that isn't there.
    - Commands: install/dev/start/test/single-test/lint, so Claude runs the project the way it's actually meant to be run instead of guessing (e.g. trying `npm run start:dev` or a test framework we don't use).
    - Architecture: a short map of server.js, routes/, db/store.js, tests/, including *why* server.js guards app.listen() behind require.main === module. That guard isn't obvious from a quick file skim and matters for how tests import the app.
    - Conventions: error response shape ({ error: "..." }) and status codes, the rule that data access always goes through db/store.js (never inlined in routes), and that PORT is the only env var. These are things Claude could get subtly wrong by inventing its own conventions (e.g. throwing exceptions instead of returning JSON errors, or querying a "database" that doesn't exist).

#what did i deliberately leave out
    - Deep code walkthroughs of individual route handlers or the store implementation — that's small enough for Claude to just read directly, and duplicating it in CLAUDE.md would drift out of sync as the code changes.
    - Git history / who-changed-what — `git log` and `git blame` are authoritative and change constantly; baking a snapshot into CLAUDE.md would go stale fast.
    - Auth, database, and deployment guidance — none of that exists in this starter project, so documenting it would be speculative and could mislead Claude into building against infrastructure that isn't there.
    - Style/formatting rules already enforced by ESLint — no need to restate what a linter already guarantees.

#Which permission rules did i add 
    - deny rules to force push, and deny from reading .env files
#what could go wrong without your deny rule
    - if AI can do force push to main i can break entire project
    - if AI can read .env files, it can give up my tokens and secret keys  