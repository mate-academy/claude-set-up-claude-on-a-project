# NOTES.md

## CLAUDE.md vs CLAUDE_old.md

**Kept:** overall structure and meaning of each section — project description, commands
(`npm run dev`, `npm test`, `npm test -- --test-name-pattern`, `npm run lint`), architecture
(`server.js`, `routes/`, `db/store.js`), and the convention of returning JSON error bodies
instead of throwing.

**Deliberately removed, and why:**

1. **Implementation details already visible from the code** — removed:
   - the `require.main === module` trick in `server.js` (lets tests import `app` without
     opening a real port);
   - "routes/ mounted under their path prefix";
   - "Data resets on every server restart (no persistence)" in `db/store.js`.

   Reason: all of this is immediately visible when reading the files. CLAUDE.md is not code
   documentation — it should hold context that isn't obvious from the code itself (why the
   file exists, which rules to follow). Duplicating it bloats the file and risks going stale
   after a refactor.

2. **`npm start` and the `http://localhost:3000` URL** — dropped as secondary details:
   `npm run dev` is enough for daily work, and the port is easy to find in `server.js`.

3. **Second bullet under Conventions** ("Data access always goes through `db/store.js`'s
   exported functions...") — removed as a duplicate: the same point is already stated in the
   Architecture section, so repeating it in Conventions was redundant.

4. The clarification "used as a real codebase for practicing Claude Code setup (not for
   building out the app itself)" — also removed: it's course context, not an instruction for
   working with the code, just noise in the prompt.

**Summary:** the old file documented *what the code is and how it's built*; the new one only
documents *rules that don't follow from reading the code*. A shorter CLAUDE.md means fewer
tokens per prompt and less chance a stale detail drifts out of sync with the code.

## Permission rules (.claude/settings.json)

```json
"allow": ["Bash(npm test:*)"],
"ask":   ["Bash(git push:*)"],
"deny":  ["Read(./.env)", "Bash(git push --force:*)"]
```

- **allow `npm test:*`** — running tests is safe and reversible, so it's allowed without
  confirmation every time.
- **ask `git push:*`** — push touches shared state (the remote repository), so it requires
  user confirmation each time.
- **deny `Read(./.env)`** — blocks reading the file that holds secrets.
- **deny `git push --force:*`** — fully blocks force-push, even with confirmation.

**What could go wrong without these deny rules:**

- Without `deny Read(./.env)`: Claude could read the contents of `.env` (API keys, passwords,
  DB connection strings) and pull them into the conversation context — from there a secret
  could leak into output, session logs, or a chat quote. This is exactly the kind of scenario
  that leads to credential compromise.
- Without `deny git push --force:*`: force-push would only sit at the `ask` tier (matched by
  the `git push:*` pattern), meaning a user could reflexively approve a "push?" prompt without
  noticing the `--force` flag, and overwrite other people's commits on a shared branch — an
  operation that can't be undone for anyone who already pulled the old remote state. The
  explicit `deny` rules this out regardless of whether the `ask` pattern behaves as expected.
