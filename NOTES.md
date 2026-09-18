# NOTES

## What went into `CLAUDE.md` — and what didn't

The file carries four things: a one-line description of the project, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus the two narrower `node --test` forms and the note that CI runs lint then tests on Node 22), a short architecture section describing the three layers (`server.js` entry point, one router per resource in `routes/`, all data access through `db/store.js`), and the conventions that aren't guessable from a quick skim — CommonJS rather than ESM, double quotes / semicolons / 2-space indent, no runtime deps beyond Express, the `res.status(code).json({ error })` early-return shape for errors, and reading config from `process.env` with an inline fallback. I also flagged the two things that are easy to break by accident: the `require.main === module` guard in `server.js` that lets `supertest` import the app without binding a port, and the fact that the in-memory store persists across requests, so tests must not assume a clean store.

I deliberately left out anything the code already says plainly: the list of endpoints, function signatures, the dependency list, and how Express routers work. I also left out one-off notes ("currently debugging X"), personal setup details, and anything sensitive — no real env values, no URLs, no credentials. The point is a file Claude can read in full every session, so anything it can find faster by reading the source is just noise crowding out the rules it can't infer.

## Permission rules

`.claude/settings.json` has three:

- **allow** — `Bash(npm test:*)`, the command I run constantly and that can't damage anything.
- **ask** — `Bash(git push:*)`, so anything leaving my machine gets one confirmation.
- **deny** — `Read(./.env)` and `Bash(git push --force:*)`.

Without the deny rules: `.env` is git-ignored, but ignoring a file only keeps it out of commits — it doesn't stop it being read. If Claude reads it while debugging a config problem, the real secrets land in the transcript and get sent to the model, and from there they can be echoed back into a summary, a commit message, or a bug report. Denying the read keeps that from ever starting; `.env.example` is there for the shape of the config instead. And `git push --force` can overwrite commits on the remote that aren't in my local history — a teammate's work, or my own after a rebase. It's one of the few git operations that genuinely destroys work, and unlike a plain push, `ask` isn't the right level: I don't want a prompt I might approve on autopilot, I want it off the table.
