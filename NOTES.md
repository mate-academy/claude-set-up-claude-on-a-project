# NOTES

## What went into CLAUDE.md

Four things, kept short: a one-line description of the API, the three commands I actually run (`npm run dev`, `npm test`, `npm run lint`), four conventions written as rules Claude can follow without asking, and a short architecture note covering the `server.js` entry point, one router file per resource under `routes/`, and data access centralized in `db/store.js`.

The conventions are the part that earns its place. CommonJS instead of ES modules matters because ESLint is configured with `sourceType: "script"` and rejects `import`, so a wrong guess here fails lint rather than just looking inconsistent. The rule about routing every resource through its own file and reading data only through `db/store.js` is the one architectural decision that isn't visible from any single file.

## What I left out, and why

- **File-by-file listings and the dependency list.** Claude can read `package.json` and `ls routes/` faster than I can describe them, and a list like that goes stale the moment someone adds a file.
- **Generic advice** such as "write tests" or "handle errors well." It costs context on every session and changes nothing about what Claude does.
- **Anything sensitive.** No env values, no URLs, no credentials. `.env.example` already documents the shape of the config, and the real values belong in `.env`.
- **One-off notes.** Anything specific to a single task belongs in that conversation, not in a file loaded into every future session.

## Permission rules

In `.claude/settings.json`:

- **allow** — `npm test`, `npm run lint`, `git status`, `git diff`. These are read-only or local-only and I run them constantly. Approving each one by hand would add unnecessary friction. The test and lint commands are also the same checks run by CI.
- **ask** — `git push` and `npm install`. Both can make consequential changes. A push updates the remote repository, while an install downloads packages and can modify `package-lock.json`. A push is visible to other people the moment it lands, and an install writes to `node_modules` and can change `package-lock.json`, so I want to see them before they happen rather than after.
- **deny** — reading `.env` and `.env.local`, `git push --force`, and `rm -rf`.

### What the deny rules prevent

The `.env` rule is about accidental disclosure. `.env` holds real secrets, and this repo's `.env.example` shows a `DATABASE_URL` with an inline password as the pattern. Without the deny rule, an innocent request like "why isn't the app picking up my config?" leads Claude to read the file, and the contents land in the transcript. From there they can end up pasted into a message or an issue. Denying the read means the secret never enters the conversation in the first place.

`git push --force` and `rm -rf` are about work I can't get back.A force push rewrites remote history, which can remove commits from the visible branch and disrupt anyone else working from that history. `rm -rf` deletes without a trash can. Both are the kind of command that is reasonable to run occasionally and catastrophic to run by mistake, so I would rather type them myself.

## Verification


- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` lists the allow, ask, and deny rules above.
- Asking "How do I run the tests here?" gets `npm test` from `CLAUDE.md` with no explanation from me.
