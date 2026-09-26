# NOTES

## What I put in CLAUDE.md, and what I left out

I kept four things: a one-line description of the project, the commands I actually run
(`npm install`, `npm run dev`, `npm test`, `npm run lint`), five conventions written as
"use X, not Y" rules, and a short architecture note.

The conventions are the part that saves the most time, because they are the things Claude
would otherwise guess wrong: this project is CommonJS, so `import` breaks it; ESLint here
extends only `eslint:recommended` and defines no style rules, so the style has to be matched
by hand instead of trusting a formatter; and all data access goes through `db/store.js`.

I left out anything already obvious from the code, such as the list of files and the contents
of each route, since Claude can read those. I also left out one-off explanations of edge cases
and anything sensitive — no secrets and no environment values are in the file.

## Permission rules, and what the deny rule protects

- **allow** `npm test` and `npm run lint` — I run both constantly and they are read-only, so
  being asked every time is pure friction.
- **ask** `git push` — pushing is visible to other people, so I want to confirm it each time.
- **deny** `Read(./.env)` and `git push --force` — `.env` is where a real secret would live, and
  without the deny rule its contents could end up quoted in a transcript or a commit. The
  force-push rule prevents rewriting branch history that others may already have pulled.

## Verification

`/memory` shows this project's `CLAUDE.md` as loaded, and `/permissions` lists the allow, ask
and deny rules above.
