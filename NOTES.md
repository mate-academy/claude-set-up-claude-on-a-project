# NOTES

## CLAUDE.md

**What I put in.** I started from `/init` and organised the file into the four parts the brief asks for:

- **Description:** one line saying what the project is: an Express REST API with an in-memory store.
- **Commands:** `npm run dev`, `npm test`, `npm run lint`, plus the `node --test --test-name-pattern=...` form for running a single test. That last one is the command Claude would otherwise have to work out each time. I also noted that CI runs lint and then tests on Node 22, so both have to pass.
- **Conventions:** rules taken from the existing code and config, each written as "do X, not Y" so Claude can follow it without asking:
  - CommonJS only, no ES `import`
  - tests use `node:test`, `supertest` and an imported `app` (no Jest, no `listen`)
  - data access goes through `db/store.js`
  - errors are JSON `{ error }` responses
  - convert ids with `Number()`
  - don't change app code unless asked
- **Architecture:** how `server.js` mounts one router per resource from `routes/`, why `listen` is guarded by `require.main === module`, and that the store is shared in-memory state. That last point matters because a test that creates users changes what later tests see. You can't tell this from any single file.

**What I left out, and why.**

- The file-by-file listing and the endpoint list. Claude can find these in seconds, and they go stale.
- Generic advice like "write tests" or "handle errors". It doesn't change what Claude does.
- The course and setup instructions from the README. They're one-off steps for this exercise, not guidance for working on the code.
- Anything from `.env`. Secrets don't belong in a file that gets committed and loaded into every session.

## .claude/settings.json

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": [
      "Read(./.env)",
      "Bash(git push *--force*)",
      "Bash(git push -f*)",
      "Bash(git push * -f *)",
      "Bash(git push * -f)"
    ]
  }
}
```

- **allow `npm test`:** it's the command run most often, it's read-only, and it's safe. Without this rule, every test run stops for an approval prompt.
- **ask `git push`:** pushing publishes work to the shared repo, so I want to confirm each push.
- **deny `Read(./.env)`:** keeps real secrets out of Claude's context. Without it, Claude could read `.env` while exploring and repeat values from it in output, logs or a commit.
- **deny force-push flags:** the rules block `--force` and `-f` wherever they appear in a `git push` command, including after the remote and branch. A force-push can overwrite other people's history on the remote, and that's hard to undo.

The deny rules take precedence over the allow and ask rules, so force-push commands are blocked even though `git push` is only set to "ask".

**Known gaps:**

- `Read(./.env)` only blocks the Read tool. A shell command like `cat .env` isn't covered by that rule.
- The repo's `.gitignore` has leading spaces on every line after `node_modules/`, so `.env` and `.claude/settings.local.json` are not actually ignored (checked with `git check-ignore`). Until that's fixed, check `git status` before committing.

## Verification

- `/memory`: `CLAUDE.md` is listed as loaded.
- `/permissions`: the allow, ask and deny rules above are listed.
