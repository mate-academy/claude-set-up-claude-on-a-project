# NOTES.md

Notes on how Claude Code is configured for this project.

## 1. What's inside `CLAUDE.md`?

`CLAUDE.md` is the project instruction file that Claude Code loads automatically at the
start of every session. It tells Claude how this repo works so it doesn't have to
rediscover the same facts each time. It has three sections:

### Commands

The exact commands for working in the repo:

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | `node --watch server.js` on http://localhost:3000 |
| `npm test` | Run the suite with Node's built-in runner (`node --test`) |
| `npm test -- tests/users.test.js` | Run a single test file |
| `npm run lint` | `eslint .` |

It also notes that CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test`
on Node 22 for every push and PR, and that **both must pass**.

### Architecture

A short map of the codebase and the responsibility of each layer:

- **`server.js`** — entry point. Builds the app, mounts `express.json()` and one router
  per URL prefix. It only calls `app.listen()` when run directly
  (`require.main === module`) and exports `app`, so tests can drive it via supertest
  without binding a port. Adding a resource means adding a `routes/` file and mounting
  it here.
- **`routes/`** — one file per resource, each exporting an `express.Router()`. Routers
  own HTTP concerns only: parse/validate input, pick a status code, shape the JSON
  response.
- **`db/store.js`** — the only data access layer. An in-memory array with a
  hand-incremented `nextId`; state resets on every restart, so tests must not assume a
  fixed row count or that a created user persists across runs.

### Conventions

The house style Claude has to match when writing code:

- **CommonJS only** — `require` / `module.exports`, never `import` / `export`.
  `package.json` has no `"type": "module"` and `.eslintrc.json` sets
  `sourceType: "script"`.
- **Named exports only, never default exports** — e.g. `module.exports = { router }`,
  never `module.exports = router`. Import with destructuring:
  `const { router } = require("./routes/users");`.
- **Formatting** — double-quoted strings, semicolons, 2-space indent.
- **Routes never touch the `users` array directly** — add a function to `db/store.js`
  and call it through the `store` module, so swapping in a real database stays a
  one-file change.
- **Validate required fields in the route before calling the store**, and coerce
  `req.params.id` with `Number()` since store lookups compare with `===`.

## 2. Which permission rules exist in the project?

They live in `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Run tests"],
    "deny":  ["Push to the main branch directly"],
    "ask":   ["Every commit"]
  }
}
```

| Bucket | Rule | Intent |
| --- | --- | --- |
| `allow` | Run tests | Running the test suite is safe and frequent, so it should never interrupt with a prompt. |
| `deny` | Push to the main branch directly | Pushing to `main` bypasses PR review and CI — it should be blocked outright, not merely confirmed. |
| `ask` | Every commit | Commits are recoverable but they alter history, so a human should approve each one. |

> ⚠️ **These rules are written in plain English, not in Claude Code's rule syntax.**
> Claude Code matches permission entries against `Tool(specifier)` patterns — for example
> `Bash(npm test:*)`, `Bash(git push:*)`, `Bash(git commit:*)`. A string like
> `"Push to the main branch directly"` matches no tool, so **none of these rules
> currently take effect**: tests still prompt, commits still prompt, and the push to
> `main` is not actually blocked. They read as intent documentation rather than
> enforcement. A working equivalent would look roughly like:
>
> ```json
> {
>   "permissions": {
>     "allow": ["Bash(npm test)", "Bash(npm test:*)"],
>     "deny":  ["Bash(git push:* origin main:*)", "Bash(git push origin main)"],
>     "ask":   ["Bash(git commit:*)"]
>   }
> }
> ```

### What could go wrong without the deny rule?

If nothing blocks a direct push to `main`, an agent that has just finished a change can
push it straight to the shared branch. The realistic failure modes:

1. **CI is bypassed as a gate.** CI runs `npm run lint` and `npm test` on push and PR,
   but a push to `main` lands the commit *first* and reports failure *after*. `main`
   ends up red, and everyone who pulls inherits broken code.
2. **No human review.** The PR is the only point where a person sees the diff. Push
   straight to `main` and code that quietly violates the conventions above — an ESM
   `import`, a default export, a route reaching into the `users` array instead of going
   through `db/store.js` — ships without anyone noticing.
3. **Shared history becomes hard to undo.** Once a bad commit is on the remote `main`,
   fixing it means a revert commit or a force-push. A force-push on a shared branch can
   destroy other people's work; on a protected branch it just fails, leaving the mess in
   place.
4. **Blast radius scales with autonomy.** In an auto-accept or long autonomous run,
   there is no confirmation step at all. One misjudged command becomes a permanent,
   public change instead of a local one that can be thrown away with
   `git checkout -- .`.
5. **Deny is the only bucket strong enough here.** `ask` still lets the push through on
   a distracted "yes"; `deny` refuses it outright, so the only path to `main` is the
   reviewed one. That is why this belongs in `deny` rather than `ask`, while commits —
   local and easily undone — belong in `ask`.

Belt-and-braces: a permission rule protects you only inside Claude Code. Branch
protection on the GitHub side (require PR, require CI to pass) enforces the same rule
for every client, human ones included.
