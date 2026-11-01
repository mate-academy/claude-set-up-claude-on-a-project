# Notes: Claude Code Project Setup

## 1. What's in `CLAUDE.md` and why

`CLAUDE.md` gives Claude Code the context it needs to work on this project safely:

- **Description:** one line on what the project is (a small Express REST API with an in-memory store).
- **Commands:** how to install, run, test and lint (`npm install`, `npm run dev`, `npm test`, `npm run lint`), so Claude uses the project's real commands instead of guessing.
- **Conventions:** the rules Claude must follow. Route handlers go in `routes/` and never in `server.js`, and async code uses `async/await` instead of callbacks.
- **Architecture:** where things live (`server.js`, `routes/`, `db/store.js`, `tests/`), including the rule that routes access data only through `db/store.js`.

## 2. Why it's short and focused

Claude Code loads `CLAUDE.md` into every session, so every line costs context and competes for attention. A short file of specific rules is easier to follow than a long one. Anything Claude can find by reading the code is left out. Only commands, conventions and architecture rules that aren't obvious from the code are written down.

## 3. Permission rules (`.claude/settings.json`)

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": [
      "Read(./.env)",
      "Bash(git push --force:*)",
      "Bash(git push -f:*)"
    ]
  }
}
```

| Rule | Effect |
|---|---|
| Allow `npm test` | Claude can run the tests without asking. |
| Ask before `git push` | Claude has to get approval for every push. |
| Deny reading `.env` | Claude can't open the secrets file with its Read tool. |
| Deny force-push (`--force` / `-f`) | Blocked outright. Deny rules win over ask rules, so approving a push doesn't allow a force-push. |

## 4. Security reasons

- **`npm test` allowed:** running tests only reads code and runs locally, so it's low risk. Approving it every time would be friction with no benefit, and letting Claude run tests freely means it checks its own changes more often.
- **`git push` needs approval:** a push sends code to a shared remote where other people and CI can see it. Once code is published it's hard to take back, so a person should approve each one.
- **`.env` blocked:** `.env` holds secrets such as API keys and passwords. Keeping it out of Claude's context means secrets can't leak into conversation logs, generated code or commits. `.env.example` is still readable, so Claude can see which variables exist.
- **Force-push blocked:** a force-push can overwrite remote history and destroy other people's commits. It's rarely needed and hard to undo, so it's blocked outright instead of left to an approval prompt.

**Known gaps:** these rules match on how the command starts, so they're a safety net rather than a guarantee.
- A force flag placed later in the command (`git push origin main --force`) only matches the `git push` ask rule. It still needs approval but isn't blocked.
- `Read(./.env)` blocks the Read tool. It doesn't stop a shell command like `cat .env`.

## 5. Verification

- **Project instructions loaded:** Claude Code loaded `CLAUDE.md` at the start of the session, and its commands and conventions were used during the session.
- **Permissions checked:** `.claude/settings.json` was read, and its contents match the four rules above.
- **Tests pass:** `npm test` ran 4 tests: 4 passed, 0 failed.
- **Lint passes:** `npm run lint` (ESLint) reported no errors or warnings.
- **Dependencies:** `npm audit fix` was run and Express was updated to 4.22.3, with tests passing afterwards. 9 moderate warnings remain, all from ESLint (a lint-only tool that never runs in the API).
