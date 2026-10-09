# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

I kept only what Claude can't infer quickly or would likely get wrong:

- **Commands:** `npm run dev`, `npm test`, `npm run lint`. Otherwise Claude might guess `npx jest` or `node server.js`.
- **Conventions,** each written as "do X, not Y" so Claude can follow it without asking: a new resource gets its own file in `routes/` plus an `app.use` line; data access goes through `db/store.js`; tests use `node:test` + `supertest` against the exported `app`, not Jest; the code is CommonJS, not ES modules.
- **Architecture:** why `server.js` exports `app` and only calls `listen` when run directly (so tests can import it), one router per resource, and the in-memory store that resets on restart.

I removed or left out:

- The generic `/init` header ("This file provides guidance to Claude Code…"). It tells Claude nothing.
- Details Claude can read from the code in seconds: the single-file test command, ESLint versions, the `{ "error": ... }` response shape, `Number(req.params.id)`, lists of files and endpoints. They make the file longer and go stale.
- Generic advice ("write clean code", "add tests").
- The course instructions themselves (e.g. "don't change app code"). That's a one-off task constraint, not a lasting project rule.
- Anything about `.env`. The deny rules in `.claude/settings.json` enforce that, so it doesn't need to be a request in CLAUDE.md.

## Permission rules (`.claude/settings.json`)

- **allow:** `npm test`, `node --test`, `npm run lint`. They are safe, read-only and run constantly, so asking every time adds nothing.
- **ask:** `git push`, because pushing publishes work and should be confirmed each time.
- **deny:**
  - `Read(./.env)`, `Edit(./.env)`, `Bash(cat .env:*)`. **Without them,** Claude could read real secrets into the conversation just by trying to "check the config", and from there they could end up in logs, a commit or a reply.
  - `git push --force` / `git push -f`. **Without them,** a single approval could silently overwrite other people's commits on the remote. Deny takes precedence over the `ask` rule for `git push`, so these are blocked outright.

The `Bash(cat .env)` rule is only a best-effort extra. Bash rules match command prefixes, so other commands could still read the file. The `Read` deny rule is the main protection.

## Fixed along the way: .gitignore

Every line after the first used to be indented with spaces, so Git treated the spaces as part of each pattern and `.env` and `.claude/settings.local.json` were not actually ignored. I removed the whitespace, and `git check-ignore -v` now confirms both files are ignored.

## Verification

In a new session, `/memory` showed the project `CLAUDE.md` loaded, and `/permissions` listed the allow / ask / deny rules from `.claude/settings.json`.
