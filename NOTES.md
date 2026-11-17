# Notes

This project was set up for **Command Code** rather than Claude Code, so the memory file is `AGENTS.md` and the shared permission rules live in `.commandcode/settings.json`. Command Code reads `AGENTS.md` (not `CLAUDE.md`) from the project root, and `settings.local.json` in the same folder is the personal, git-ignored override.

## What went into `AGENTS.md`

I kept four things: one line saying what the project is, the three commands I actually run (`npm run dev`, `npm test`, `npm run lint`), four conventions that are real "use X, not Y" rules (CommonJS only, one router per resource with data access in `db/store.js`, JSON errors with 400/404 statuses, existing formatting enforced by lint), and a short architecture section covering the `server.js` entry point, the route files, the in-memory store, and how tests import `app`.

I deliberately left out anything the code already says: endpoint lists, the exact shape of the seed users, the ESLint config details, and how `express.json()` is wired. I also excluded one-off notes (how to clone the repo, course instructions) and anything sensitive — the file only mentions `.env` as an example location, never values. Reason: memory is re-read on every turn and costs tokens each time, and a long file makes the useful rules harder to find. The goal was rules that change behaviour, not a description of the repo.

## Permission rules

- **allow: `Shell(npm test)`** — the test command is safe, read-only with respect to source files, and the one I run constantly, so it should never prompt.
- **ask: `Shell(git push:*)`** — pushing is visible to others, so I want to confirm it every time.
- **deny: `Read(.env)`** — blocks reading real secrets in the project root.
- **deny: `Shell(git push --force*)`** — blocks history-rewriting force pushes even under a broad allow/push confirmation.

Without the `.env` deny rule, Command Code treats reads as free by default: the agent could read `.env` (which will hold real credentials later) and quote it back into the conversation or a commit. Without the force-push deny rule, an `ask` on `git push` could still be approved for a `--force` variant, and a force push to a shared branch can irreversibly drop commits for everyone else. Deny beats ask beats allow, so these hold in every mode, including `yolo`.

## Verification

I checked this from inside a Command Code chat session, not from a terminal:

- The memory is loaded: every request carries an `AGENTS.md` block in the system prompt, and this file appeared there right after it was created mid-session (memory is re-read on each request, so no restart was needed).
- The rules file is valid JSON at the path Command Code documents, `.commandcode/settings.json`. Permission rules are read at session start, so they apply from the next fresh session.
- In the interactive TUI, `/memory` lists the loaded `AGENTS.md` and `/permissions` shows the allow / ask / deny lists. Those slash commands are not available in the chat-only client, so the checks above stand in for them.
