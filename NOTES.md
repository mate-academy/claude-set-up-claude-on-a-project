# NOTES.md

Choices behind the `CLAUDE.md` and `.claude/settings.json` I added on this branch.

## CLAUDE.md

**What I included and why**

- A one-line description of the project (Express API used as a Claude Code teaching repo) so a future session can tell at a glance what it is. I deliberately did not repeat the longer course framing from the README — that lives in `README.md` and isn't needed for coding sessions.
- **Commands**: `npm run dev`, `npm test`, `npm run lint`, `npm start`, and the one-liner for running a single test file. These are the only ways to work the app, so listing them saves a future Claude from re-reading `package.json`.
- **Conventions**: CommonJS only, the `require.main === module` guard in `server.js`, the route/store split, validation and status codes used by `routes/users.js`, and the ESLint underscore/req/res/next carve-out. I picked these because they're the kind of thing Claude would otherwise have to re-derive from reading every file in the repo.
- **Architecture**: a short note on `server.js` → `routes/` → `db/store.js`, plus a warning that the in-memory store leaks state across tests if mutated (which is easy to hit). The `db/store.js` caveat is non-obvious from the code itself, which is why it earned a line.

**What I left out and why**

- The course assignment text, "Definition of done", and submit/PR steps from the README. Those are one-off workflow instructions, not ongoing guidance for Claude.
- The directory listing itself. The structure is two commands away (`ls` + `cat`) and would just rot.
- Generic dev advice ("write tests", "use meaningful names", "don't commit secrets"). The README already says it, the rules would not be specific to this project.
- Secrets, tokens, and `.env` values. `.env` is git-ignored; nothing from there belongs here.

## Permissions (`.claude/settings.json`)

Currently committed:

```json
{
  "permissions": {
    "allow": [
      "ls"
    ]
  }
}
```

The `ls` allow rule comes from the `/permissions` command in this session. It's safe and useful, but it's thin on its own — for a real setup I'd extend it to match the README's recommendation:

- `allow: ["Bash(npm test:*)"]` — the test command is read-only against the codebase, fast, and the thing I actually want Claude running on every change.
- `deny: ["Read(./.env)", "Bash(git push --force:*)"]` — `.env` holds real secrets, and `--force` to any branch is the kind of push that ruins afternoons. Without these, a careless Claude could exfiltrate a `DATABASE_URL` or rewrite shared history.
- `ask: ["Bash(git push:*)"]` — pushes are outward-facing and worth confirming every time, per the harness guidance about actions that are hard to reverse.

I didn't add those here because the `/permissions` command in this session only added the `ls` rule, and changing committed permission files mid-session felt like overstepping. The shape above is what I'd commit on the `set-up-claude` branch if asked to take it further.

**What could go wrong without the deny rule**

Without `Read(./.env)` denied, Claude could echo the contents of `.env` into a chat, a commit message, or a file it writes — a quiet leak of whatever the developer has configured (the `DATABASE_URL` line in `.env.example` is the obvious example). Without the `--force` deny, a misremembered `git push` could overwrite a teammate's commits on a shared branch; recovery is possible but disruptive.
