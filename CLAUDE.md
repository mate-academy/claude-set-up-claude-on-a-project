# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (starter project for the Claude Code course) with an in-memory data store.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with file-watch auto-restart (`node --watch server.js`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner, `node --test`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint (`eslint .`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR against Node 22.

## Architecture

- `server.js` — entry point; builds the Express app, mounts routes, and starts listening. It only calls `app.listen` when run directly (`require.main === module`), and exports `app` unstarted otherwise — this is what lets tests import the app and drive it with supertest without binding a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under their path prefix (e.g. `/users`, `/health`).
- `db/store.js` — the only data access layer; an in-memory array with `getAllUsers`/`getUserById`/`createUser`. No persistence — state resets on every restart. Routes call into this module rather than touching data directly.
- `tests/` — integration-style tests that import the exported `app` and hit it through `supertest`, rather than unit-testing route handlers in isolation.
- `.env.example` — sample config; real values go in a git-ignored `.env` (only `PORT` is currently used).

## Collaboration preferences

- The user is a beginner with Claude Code and not an experienced programmer yet.
- Prefer a calm, step-by-step workflow: first explain the plan briefly, then make changes.
- Before larger edits, explain what will be changed and why.
- Prefer small, safe changes over large refactors.
- When possible, explain things in simple language and avoid unnecessary jargon.
- If there are multiple possible solutions, present the simpler one first.

## Coding preferences

- Prefer Python for examples, scripts, utilities, and explanations when Python is a reasonable choice.
- Write code in a beginner-friendly style: readable, explicit, and easy to modify.
- Use clear variable and function names.
- Add comments to important parts of the code, especially where the logic may not be obvious.
- Do not over-comment trivial lines; comment intent and key decisions.
- When introducing a new function, include a short docstring if it improves readability.
- Prefer simple standard-library solutions before adding extra dependencies.

## Change workflow

- For non-trivial tasks, first inspect relevant files and propose a short plan.
- Then implement the solution in small steps.
- After changes, explain what was changed in concise bullet points.
- When relevant, run the smallest useful test first, then broader tests if needed.
- If a command may be destructive or risky, ask for confirmation first.

## Teaching mode

- While working, briefly explain important concepts so the user can learn from the changes.
- When fixing an error, explain the cause of the error and why the fix works.
- When editing code, prefer solutions that are educational and maintainable.
- If the repository uses a different stack (for example Node/Express), keep the project’s conventions, but use Python for helper examples unless the task must be done in JavaScript.

## Repository safety

- Do not change project structure or rename files unless necessary.
- Do not add new dependencies unless there is a clear benefit.
- Preserve the existing project style unless explicitly asked to modernize or refactor.