# NOTES

## CLAUDE.md — what's in, what's out, and why

**Included:**
- A one-line description of the project, so Claude doesn't have to infer intent from the code on every session.
- The three commands actually used day-to-day (`dev`, `test`, `lint`) — these are exactly the scripts in `package.json`, nothing invented.
- Two conventions that aren't obvious from reading any single file: CommonJS-only (visible in `server.js`, but easy for Claude to "fix" into ESM without being told), and the `{ error: "message" }` shape for error responses (a pattern repeated across `routes/users.js` that's only obvious once you've read more than one handler).
- An architecture note describing the layering (`server.js` → `routes/` → `db/store.js`) so Claude respects the separation instead of, say, reaching into the in-memory array directly from a route.

**Deliberately excluded:**
- Anything derivable by just reading the code (e.g., listing every route or every field on the `User` object) — restating the code goes stale the moment the code changes, and Claude can read the files directly.
- The CI workflow details (`.github/workflows/ci.yml`) — it's a one-off detail for GitHub, not something that changes how Claude should write code here.
- Any mention of `.env` / secrets — there's nothing to say that isn't already in `.env.example`, and calling out secret-handling in a file that gets read into every session felt like the wrong place to talk about secrets at all.
- Long explanations — the goal was a file that earns its place; every line should save a real back-and-forth, not pad context.

## Permission rules — what was added and why

Added to `.claude/settings.json`:
- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, read-only-in-effect commands run constantly during a session. Without an allow rule, Claude would prompt for permission every single time, which trains people to reflexively click "yes" instead of reading the prompt.
- **ask**: `Bash(git push:*)` — pushing affects a shared remote, so it's worth a confirmation each time, but it's common enough during normal work that a flat deny would be too restrictive.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`.

**Security risk without the `Read(./.env)` deny rule:** `.env` is git-ignored specifically so real secrets (API keys, database URLs) never reach source control, but that doesn't stop Claude from reading the file directly from disk during a session. Without the deny rule, a secret could end up quoted back in a chat response, pasted into a shared log, or copied into a file that *isn't* git-ignored — at which point the "secrets never get committed" guarantee `.gitignore` is supposed to provide is broken by a side channel it was never designed to cover.

**Security risk without the `Bash(git push --force:*)` deny rule:** a force-push rewrites remote history, silently discarding any commits made by teammates in the meantime. Without the deny rule, a single instruction like "clean up the branch history" could translate into a `git push --force` that erases someone else's work with no easy recovery.
