# Setup Notes

Notes on how Claude Code was configured for this repo: what went into `CLAUDE.md`,
why the permission rules look the way they do, the risk the `.env` deny rule covers,
and verification of the `/memory` and `/permissions` commands.

## 1. CLAUDE.md — included vs. omitted

### Included

- **One-paragraph project summary** — an Express REST API with a `/users` resource
  and a `/health` check, backed by an in-memory store. Orients Claude before it
  reads any code.
- **Commands** — `npm run dev`, `npm test`, single-test-file invocation, and
  `npm run lint`, with the exact underlying tooling (`node --watch`, `node --test`,
  `eslint:recommended`). These are not guessable from `package.json` alone
  (e.g. the no-framework `node:test` runner).
- **Conventions** — the non-obvious rules that keep contributions consistent:
  CommonJS only (ESLint parses as `script`), one router file per resource mounted
  in `server.js`, all data access through `db/store.js`, keep the
  `require.main === module` guard, and stick with `node:test` + `supertest`.
- **Architecture** — the role of `server.js`, `routes/`, and `db/store.js`, plus
  the request flow `server.js → routes/ → db/store.js`. Short, because the codebase
  is small.
- **CI note** — lint then test on Node 22 for every push and PR, so Claude knows
  what has to pass before a change is "done".

### Intentionally omitted

- **Line-by-line file walkthroughs** — the repo is small enough to read directly;
  duplicating it in `CLAUDE.md` just creates drift.
- **Generic Node/Express/JavaScript tutorial content** — Claude already knows the
  framework; only project-specific choices are worth writing down.
- **Style minutiae already enforced by tooling** — ESLint and the existing code
  are the source of truth; restating them invites contradiction.
- **API endpoint reference / request-response examples** — belongs in `README.md`,
  and the route files are self-documenting.
- **Git workflow, branch naming, PR etiquette** — not established by this repo and
  not something the setup task should invent.
- **Secrets, tokens, environment values** — never belong in a committed file.

## 2. Rationale for the permission rules

`.claude/settings.json` (committed, shared with everyone on the project):

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "deny": ["Read(./.env)"]
  }
}
```

- **`allow: Bash(npm test:*)`** — the test suite is read-only, deterministic, run
  constantly during development, and safe to invoke unattended. Pre-approving it
  removes the most frequent permission prompt without widening the surface to all
  of `npm` or all of `Bash`. The `:*` covers `npm test`, `npm test -- <file>`, etc.
- **`deny: Read(./.env)`** — a hard block, not a prompt. `.env` holds real secrets
  (see `.env.example`), and there is no legitimate reason for Claude to read it.
  A `deny` rule cannot be click-through-approved by accident, so it stays enforced
  even in permissive modes.
- **Everything else stays default (ask)** — writes, other shell commands, network
  calls, and installs still prompt. The allowlist is deliberately narrow: add more
  entries only when a command proves both frequent and safe.
- **Machine-specific overrides go in `.claude/settings.local.json`**, which
  `.gitignore` excludes. The committed file is the team baseline; personal
  conveniences do not leak into it.

## 3. What could go wrong without the `.env` deny rule

Without `deny: Read(./.env)`, reading `.env` falls back to a normal permission
prompt — one `y` keypress away, or auto-allowed entirely in a
bypass/accept-edits-style mode. Concrete failure paths:

- **Secret exfiltration into context.** Once `.env` contents are in the
  conversation, they can be echoed into a file, a commit, a log, a bug report, a
  pasted snippet, or an outbound API/tool call. Anything sent to an external
  service may be cached or indexed and cannot be reliably retracted.
- **Accidental commit.** Values pulled into context can be reproduced into a
  tracked file (a "config example", a test fixture) and pushed. `.env` itself is
  git-ignored; a paraphrase of it is not.
- **Prompt-driven mistakes.** A vague instruction like "print the config" or
  "debug the startup env" would let Claude read and display live credentials
  instead of `.env.example`.
- **Blast radius.** `DATABASE_URL` and similar give direct access to real
  infrastructure; leaking them is a production incident, not a local one.

The deny rule makes the answer an unconditional refusal, so none of the above can
start. `.env.example` remains readable and is the correct thing to consult.

## 4. Verification of `/memory` and `/permissions`

Both are built-in Claude Code slash commands and were checked:

- **`/permissions`** — opens the permissions manager. It lists the effective
  allow / ask / deny rules and their source files. The two rules from
  `.claude/settings.json` (`allow Bash(npm test:*)`, `deny Read(./.env)`) show up
  there, confirming the committed file is being loaded and applied.
- **`/memory`** — opens the memory / instruction files for editing. This repo's
  `./CLAUDE.md` appears as a project memory file (alongside user-level
  `~/.claude/CLAUDE.md`), confirming the guidance in this document is the file
  Claude actually reads at session start.

Both commands are interactive terminal UIs, so "verified" here means: the commands
are recognized, they open, and they reflect the configuration committed in this
repo.
