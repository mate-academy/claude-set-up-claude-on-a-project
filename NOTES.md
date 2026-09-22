# NOTES.md

## What went into CLAUDE.md, and what I left out

I kept four things: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), five conventions, and a short architecture note.

The conventions are the part that earns its place, because each one is a rule Claude cannot infer safely from a single file:

- **CommonJS, not ESM** — the whole point is that ESLint is configured with `sourceType: "script"`, so an `import` statement fails the lint. Without this line, Claude writes modern-looking code that breaks the build.
- **Routes never touch data directly** — this is the architectural decision of the project. It is visible in `routes/users.js` today, but nothing stops a new route from querying inline, so I wrote it down.
- **Error shape `{ error: "message" }` with an explicit status** — a convention worth stating so responses stay consistent across resources.
- **Never call `app.listen` in a test** — this one prevents a real failure. `server.js` only listens when run directly (`require.main === module`), and the tests depend on that guard.

What I deliberately left out:

- **The list of endpoints.** `GET /users`, `POST /users`, `GET /health`. Claude reads `routes/` faster than I can maintain a list that goes stale.
- **What Express is, and how to install Node.** Generic knowledge, not project knowledge.
- **Anything from `.env.example`.** Even placeholder config does not belong in a file loaded into every session.
- **One-off tasks.** "Add pagination to /users" is a prompt, not a standing instruction.

Rule I applied: if the information is already in the code, or true of every Node project, it does not go in. What goes in is what Claude would get wrong on the first try.

## Permission rules, and what the deny rule prevents

**allow** — `npm test`, `npm run lint`, `git status`, `git diff`. Read-only or side-effect-free, run many times per session. Approving each one is friction with no safety gain.

**ask** — `git push` and `npm install`. Push is outward-facing: once code is on GitHub it is public, and this is a fork I submit PRs from. `npm install` writes to `node_modules` and can change `package-lock.json`, so I want to see which package is being added.

**deny** — reading `.env` and `.env.local`, `git push --force`, and `git reset --hard`.

`.env.example` stays readable on purpose: it is committed, contains only placeholders, and tells Claude which variables exist without exposing any value.

**What could go wrong without the deny rule, specifically in this repo:**

Without `Read(./.env)`, a secret from an untracked local file would be pulled into the conversation. It does not need to be committed to leak — once it is in context, it can end up quoted in an explanation or in a file Claude writes.

That risk is higher here than it looks, and I verified it. The repo's `.gitignore` has **leading whitespace** on lines 2 to 4:

```
node_modules/
   .env
   npm-debug.log*
   .claude/settings.local.json
```

Git does not strip leading whitespace in ignore patterns, so those three patterns do not match anything. Proof:

```
$ printf 'PORT=3000\nSECRET=test\n' > .env
$ git status --short
?? .env                          ← untracked, not ignored

$ git check-ignore -v .env
(no output — no rule matches)
```

Only `node_modules/` on line 1 is actually being ignored. So in this repo `.env` **is** committable by accident, and so is `.claude/settings.local.json`, which is supposed to stay personal. The deny rule is the layer that still holds when the `.gitignore` does not.

The two destructive denies cover the operations that discard work with no undo: `git push --force` overwrites remote history for everyone, and `git reset --hard` throws away uncommitted changes locally.

## Verification

Checked in a fresh session:

- `/memory` lists `CLAUDE.md` at the project root as loaded.
- `/permissions` shows the allow, ask and deny rules from `.claude/settings.json`.
- Asked "How do I run the tests here?" and got `npm test` with the note that it uses the built-in `node --test` runner — taken from `CLAUDE.md`, without me explaining anything.
