# NOTES.md

## CLAUDE.md

I kept it to four lean sections: a one-line project description, **Commands** (`npm run dev`, `npm test`, running a single test, `npm run lint`, and what CI runs), **Architecture** (the `server.js` entry point pattern that lets tests import `app` without opening a port, the one-router-per-resource layout, and the in-memory `db/store.js`), and **Conventions** (CommonJS, not ESM; the ESLint ruleset).

I left out anything Claude can already see by reading the code — the exact route paths, the shape of the `User` object, the full ESLint config, and the `.env.example` contents. I also skipped generic advice ("write tests", "don't commit secrets") since that's true of every project and doesn't help Claude specifically here. Nothing sensitive went in since there's nothing sensitive in this starter repo.

## Permissions (`.claude/settings.json`)

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — the three scripts I run constantly while iterating; letting them run without a prompt each time is the main point of setting this up.
- **Ask**: `git push` — pushing is visible to others (or would be, on a real remote), so I want a chance to glance at what's going out before it does.
- **Deny**: reading `.env` and `git push --force`. Without the `.env` deny rule, Claude could read real secrets into context the moment a `.env` file exists (this repo only ships `.env.example`, but the rule protects the moment someone adds a real one). Without the force-push deny rule, an agent chasing a merge conflict or a "clean up history" request could silently overwrite shared branch history — force-push failures are hard to notice until someone else's work has already vanished.
