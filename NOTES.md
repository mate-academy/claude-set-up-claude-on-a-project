What I put in CLAUDE.md and what I left out (and why)

- In the project CLAUDE.md I kept only what Claude needs the npm scripts, the CommonJS + Express router pattern, the data-access rule.
- I described the architecture by naming each file and its single responsibility, so Claude can locate the right place without guessing.
- I left out code-style rules (line length, indentation, quoting). The project has ESLint for that.

Permission rules I added (.claude/settings.json)

- allow: Bash(npm test:*) — tests are the safest loop Claude runs; letting them go without a prompt keeps iteration fast.
- ask: Bash(git push:*) — pushing is outward-facing and hard to reverse quietly, so I want a confirmation every time.
- deny: Read(./.env) — the file holds secrets, and a stray Read would paste them into the transcript and context.
- deny: Bash(git push --force:*) — this is the one that matters.

What could go wrong without the force-push deny

- Force-push rewrites remote history, so every teammate's local copy and every open PR silently diverges from origin.
- A wrong refspec (git push --force origin main:dev) can clobber an unrelated branch.
- It can permanently erase commits that were only on the remote, including releases or review history.

