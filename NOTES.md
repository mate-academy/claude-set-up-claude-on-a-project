# Notes

## What I put in CLAUDE.md, and what I left out

### What I put in

`CLAUDE.md` is short and split into three sections:

- **Commands** — the three scripts an agent actually needs: `npm run dev`, `npm test`, `npm run lint`. These are the things Claude would otherwise have to guess or rediscover by reading `package.json` every session.
- **Conventions** — the non-obvious rules that the code *follows* but doesn't *announce*: CommonJS over ES modules (and the ESLint reason why), one route file per resource, all data access through `db/store.js`, and the `400`/`404` validation contract. These are the decisions most likely to be silently violated.
- **Architecture** — a quick map of how the pieces fit: `server.js` as the entry point with the `require.main === module` guard so tests can import the app without binding a port, the `routes/` layout, the in-memory `db/store.js`, and how `tests/` drives the app with `supertest`.

### What I deliberately left out, and why

- **Restating what the code already says.** I didn't list every endpoint, every field on a user, or paste route handlers. That information is in the source, stays fresher there, and would just rot in a doc.
- **Generic Node/Express tutorial content.** No "what is Express," no "how to use npm." The reader is an agent that already knows the ecosystem; spelling it out wastes context budget.
- **Install/setup boilerplate already in the README.** `git clone`, `npm install`, env-var setup, and prose explanations live in `README.md`. CLAUDE.md points to the *behaviors* I want, not the onboarding story.
- **Style rules covered elsewhere.** Indentation and formatting are enforced by ESLint (`npm run lint`) and my global style preference, so they don't need to be repeated per-project.

The guiding principle: CLAUDE.md should hold the things that are **true, non-obvious, and easy to get wrong** — the conventions and architecture decisions — not a mirror of the codebase. Every line should change what an agent *does*, not just describe what exists.

## Permission rules I added

From `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask":   ["Bash(git push:*)"],
    "deny":  ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- **allow `Bash(npm test:*)`** — running the test suite is safe and frequent, so it runs without an approval prompt each time.
- **ask `Bash(git push:*)`** — pushing is outward-facing and hard to undo, so it pauses for explicit confirmation rather than being silently allowed or blocked.
- **deny `Read(./.env)`** — the agent can never read the local secrets file.
- **deny `Bash(git push --force:*)`** — force-pushes are blocked outright (this is more specific than the `git push` ask rule, and deny wins).

### What could go wrong without the deny rules

- **Without `deny Read(./.env)`:** the agent could read real credentials (DB passwords, API keys) out of `.env` and then leak them — echoing them into a tool result, pasting them into a commit or PR, or sending them to an external service during normal work. `.env` is gitignored precisely because it holds secrets; the deny rule makes "don't read secrets" a hard wall instead of relying on the agent's judgment every time. (`.env.example`, the safe template, stays readable.)
- **Without `deny Bash(git push --force:*)`:** a force-push can overwrite shared history on the remote — clobbering teammates' commits, erasing a branch's history, or destroying work that only existed on the server. Unlike a normal push, it's destructive and not cleanly recoverable. Blocking it outright means even an agent that's been granted push access can't turn a routine push into a history-rewrite.
