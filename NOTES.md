# NOTES.md

## What went into CLAUDE.md — and what didn't

The file has the four required parts: a one-line description, the three commands I actually run (`npm run dev`, `npm test`, `npm run lint`), five conventions, and a short architecture map.

The conventions are the part I spent most time on, because they're the rules Claude can't infer. Two matter most: **CommonJS, not ESM** (easy to get wrong, since most Express examples online are ESM) and the **error shape `{ error: "message" }` with an explicit status**, so new routes match the existing ones without me reviewing them. I also noted that the style rules (double quotes, semicolons, 2-space indent) are *not* lint-enforced — `.eslintrc.json` only configures `no-unused-vars`, so `npm run lint` passing doesn't mean the style is right. Without that caveat Claude would reasonably assume lint is the source of truth.

For architecture, each bullet says what *not* to do, not just what exists: keep the `require.main === module` guard in `server.js`, go through `db/store.js` instead of touching module state, and assert on shape rather than exact counts in tests because the in-memory store is shared across a run. A description of the layout alone would be re-derivable from `ls`; the constraints aren't.

What I deliberately cut from the `/init` draft:

- **`npm install`** — obvious from `package.json`.
- **The full CI job description** — collapsed to a comment on the lint line. The detail lives in `.github/workflows/ci.yml`; duplicating it means two places to update.
- **Anything restating the code**, e.g. listing every store function. If Claude needs the signature it can read the 20-line file.
- **Real config values.** `.env.example` gets a "placeholder values only" rule instead.

Net effect: ~40 lines down to ~28. I kept one section the brief didn't ask for — **Scope** — because "don't refactor the app, the deliverables are the config files" is the single thing in the file that isn't derivable from the code, and it's what stops Claude from helpfully improving an API that isn't the assignment.

## Permission rules

```json
"allow": ["Bash(npm test:*)", "Bash(npm run lint:*)"]
"deny":  ["Read(./.env)", "Read(./.env.*)",
          "Bash(git push --force:*)", "Bash(git push -f:*)",
          "Bash(git push --force-with-lease:*)"]
"ask":   ["Bash(git push:*)"]
```

**Allow** covers the two commands from CI. Both are read-only and I run them constantly, so approving each one is friction with no safety value.

**Deny on `.env`** is the one that protects against a mistake I'd actually make. The risk isn't Claude "stealing" secrets — it's that anything Claude reads enters the transcript, and from there it can end up quoted in a summary, a commit message, or a PR description. A leaked key doesn't un-leak. `.env` is gitignored precisely because it's the one file that shouldn't travel; the deny rule extends that to the conversation. I used `.env.*` as well so `.env.local` is covered too.

**Deny on force-push** protects history rather than secrets. Without it, a force-push after a rebase can erase a teammate's commits from a shared branch, and unlike most Git mistakes there's no reflog on the remote to recover from. I wrote three patterns — `--force`, `-f`, and `--force-with-lease` — because rules are prefix matches, so one spelling wouldn't catch the others.

Known gap: prefix matching still can't catch a trailing flag (`git push origin main --force`). That's the main reason I kept the **ask** rule on `git push:*` rather than allowing plain pushes — it's the backstop when a deny pattern doesn't match, and it means any push to a shared remote gets a deliberate yes from me.

## Verification

- `/permissions` shows the allow / deny / ask rules.
- `/memory` opens the memory files; the project `CLAUDE.md` is loaded.
- Asked "How do I run the tests here?" in-session and got `npm test`, the single-file and single-test-name variants, *and* the warning about shared store state between tests — all from `CLAUDE.md`, without me explaining any of it. That last detail is the proof the file is doing real work.
- `npm run lint` clean and `npm test` 4/4 passing locally, in CI's order.

## Two things worth knowing about `/permissions`

First, rules added through `/permissions` went to **`.claude/settings.local.json`**, not the shared `settings.json`. Since `.gitignore` excludes the local file, rules added that way would never have reached the repo — I'd have "committed my permission rules" with an empty file. I wrote `.claude/settings.json` directly instead.

Second, the rules it recorded were written as plain descriptions — `"git push"` rather than `Bash(git push:*)`. That form matches nothing, so it's a rule that looks present in the file and does nothing. Worth checking the JSON rather than trusting that a rule appeared.

One deliberate leftover: I asked Claude to clear the stale `"git push"` entry from `settings.local.json` and the request was **blocked** by the permission classifier — writing a *new* settings file with deny rules was fine, but removing an existing `ask` rule loosens a guardrail, so it required me to do it by hand. Correct behaviour, and a good illustration of the point: the permission system also applies to edits to the permission system.
