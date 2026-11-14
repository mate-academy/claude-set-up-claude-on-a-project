# Notes

## What went into CLAUDE.md, and what was left out

**In:**

- A one-line description, so Claude knows straight away this is a small Express API with an in-memory store.
- The commands I run often (`npm run dev`, `npm test`, `npm run lint`), plus how to run a single test file or filter by test name. The single-test form is not in `package.json`, so Claude would otherwise have to guess it.
- Conventions that Claude could plausibly get wrong without being told:
  - CommonJS, not ES modules. ESLint parses files as scripts, so `import` fails lint.
  - `node:test` with `supertest`, not Jest or Mocha. Claude tends to reach for Jest by default.
  - Routes go through `db/store.js` and never touch the data directly.
  - Errors are JSON in the shape `{ "error": "..." }` with the matching status code.
  - `.env` is never read or committed; new config goes in `.env.example`.
- Architecture points that take reading more than one file to see: `server.js` only calls `listen()` when run directly, which is what lets the tests import the app, and the store's state is shared across tests, so tests must not assume exact counts or IDs.

**Out, and why:**

- A file-by-file listing. Claude can see the tree in one command, and a listing goes stale as soon as a file is added.
- Generic advice ("write tests", "handle errors"). It applies to every project, so it costs context without changing what Claude does here.
- Course instructions and one-off tasks from the README. They describe this assignment, not how the codebase works.
- Anything sensitive. No values from `.env`, only the rule about it.
- Endpoint-by-endpoint documentation. The route files are short and already commented.

## Permission rules

**Allow:** `npm test`, `npm run lint`, `node --test`. These only read the code and report, and I run them constantly, so a prompt each time is pure friction.

**Ask:** `git push` and `npm install`. A push leaves my machine and others see it; an install downloads and runs third-party code. Both are fine most of the time, but I want to see them happen.

**Deny:** reading or editing `.env`, and `git push --force` / `-f` in any argument position.

**What could go wrong without the deny rules:**

- Without the `.env` rule, Claude could open the file while exploring the project. Any real secret in it (a database URL, an API key) would end up in the conversation, and from there could be echoed into a commit, a log, or a test fixture.
- Without the force-push rule, one mistaken command could overwrite remote history and destroy teammates' commits. That is hard to undo, which is why it is denied outright rather than set to ask.

The deny rule only covers `./.env`, so `.env.example` stays readable and editable.

## Something I noticed

The lines for `.env`, `npm-debug.log*` and `.claude/settings.local.json` in `.gitignore` are indented, and git does not strip leading spaces, so those patterns do not match. `git check-ignore .env` confirms `.env` is not ignored by this repo. I left `.gitignore` unchanged because the task says not to change the project, but it makes the deny rule and the "never commit `.env`" convention more important, not less.

## Verification

- [ ] `/memory` in a fresh session shows `CLAUDE.md` loaded
- [ ] `/permissions` shows the allow / ask / deny rules above
- [ ] Asking "How do I run the tests here?" is answered from `CLAUDE.md`

<!-- Tick these after checking them in a new session, and replace this comment with a line saying what you saw. -->
