# NOTES.md

Reasoning behind the `CLAUDE.md`, the permission rules in `.claude/settings.json`, and the
secrets hook in `.claude/hooks/block-secrets.js`.

## 1. What I put in CLAUDE.md, and why

I deleted the very first auto description of the main purpose, because it was redundant for
the context. `/init` starts every file with the line *"This file provides guidance to Claude
Code (claude.ai/code) when working with code in this repository."* Claude already knows what a
`CLAUDE.md` is for; that sentence is loaded into the context on every single turn and tells
Claude nothing about this project. I replaced it with a heading and went straight to the
content that actually changes how Claude behaves.

The file has four parts. For each one, here is what it says and the reason it earns its place.

### One-line description
*An Express REST API sample code*

### Detail description 

*A small Express REST API (users + health endpoints) backed by an in-memory store. It is the
starter project for the Claude Code course; the course tasks are about configuring Claude on
it, not changing the app.*

The first half orients Claude in one read: framework, resources, and the fact that there is
no real database. The second half is a guard-rail. Without it, a well-meaning Claude will
"improve" the app (add validation libraries, persist the store, restructure routes) when the
assignment is explicitly to leave the code alone.

### Commands

I kept exactly the commands I run constantly: `npm install`, `npm run dev`, `npm test`,
`npm run lint`. Next to each one there is a short note on what it really does (`--watch`,
the built-in `node:test` runner, `eslint .`) so Claude does not have to open `package.json`
to find out.

I added two commands that `/init` does not know about but that save the most time in
practice: running a single test file, and running a single test by name with
`--test-name-pattern`. I verified both against the real test file before writing them down:
the file form runs all 4 tests, the pattern form narrows it to 1.

The last line explains that CI runs `npm run lint` and then `npm test` on Node 22 for every
push and PR. Without this, Claude would only learn that lint is mandatory from a red PR.

### Conventions

Every rule is a real "use X, not Y" that Claude cannot infer without either asking me or
getting it wrong:

- **CommonJS only.** ESLint is configured with `sourceType: "script"`, so an `import`
  statement fails lint. Claude's default instinct in a modern Node project is ES modules.
- **`node:test` + `node:assert` + `supertest`, no other runner.** Claude's reflex when asked
  to add a test is to install Jest. That would add a dependency and a second runner for
  nothing.
- **Keep the `require.main === module` guard in `server.js`.** The tests import `app` and
  never open a port. If the guard is removed, every test run starts a real server and the
  process hangs.
- **All data access goes through `db/store.js`.** The whole point of the store module is to be
  the single seam that gets swapped for a real database later. Routes that touch the array
  directly break that.
- **Error shape.** Validation errors are `400` with `{ error: "..." }`; missing resources are
  `404` with the same shape. Any new route Claude writes will match the existing two.
- **Unused `req`, `res`, `next` are allowed by lint.** Otherwise Claude "fixes" warnings that
  do not exist, for example by renaming parameters to `_req`.
- **Config comes from environment variables; `PORT` is the only one; never read, print, or
  commit `.env` files or dump the environment.** This is the instruction half of a rule that
  is also enforced by the permission system (section 2). Telling Claude *and* blocking it is
  deliberate: the instruction shapes what Claude tries, the deny rule guarantees the outcome.

### Architecture

Four lines that need several files to work out: `server.js` is the entry point and exports
`app`; there is one router file per resource under `routes/`; `db/store.js` is the only data
layer and resets on restart; `tests/` runs supertest against the exported app. I included the
sentence *"add a new resource by creating a new file here and mounting it in `server.js`"*
because that is the most likely task anyone will give Claude in this repo.

### What I deliberately left out, and why

- **The `/init` boilerplate header.** Covered above: pure overhead on every turn.
- **A file-by-file listing.** Claude can run `ls`, and the README already has one. Listing
  files in `CLAUDE.md` goes stale the moment a file is added.
- **The course instructions from the README** (tasks, checklist, how to submit). They are
  one-off and about me, not about working in the code.
- **Anything from `.env.example`, or any real value.** `CLAUDE.md` is committed and loaded
  into every conversation, so it is the worst possible place for configuration values. I even
  removed a pointer to `.env.example` once the deny rule started covering `.env.*` files, so
  the file never tells Claude to open something it is not allowed to open.
- **Generic advice** such as "write tests" or "handle errors carefully". Claude does that
  anyway; the lines would only dilute the rules that matter.

The result is about 40 lines. Every line either saves a question or prevents a mistake.

## 2. Permission rules, and what goes wrong without them

The shared file is `.claude/settings.json`, committed so everyone on the branch gets the same
rules. It sets `defaultMode` to `default`, which means Claude asks before running commands or
editing files unless a rule below says otherwise. I chose this over `acceptEdits` or
`bypassPermissions` because this is a learning project and I want to see what Claude does.

### Allow rules

```
Bash(npm test:*)
Bash(npm run lint:*)
Bash(node --test:*)
```

These are read-only, fast, and I run them dozens of times a session. A prompt for each one is
friction with no safety benefit. I did not put `npm run dev` here: it starts a long-running
server, which is a personal convenience, so it lives in my local file instead (section 4).

### Ask rule

```
Bash(git push:*)
```

Pushing is outward-facing: it publishes work. Even if some other rule allowed it, I want a
confirmation every time so nothing leaves my machine without me looking at it.

### Deny rules, one by one

Deny always wins over allow and ask. That is what makes these rules a real boundary rather
than a preference.

**`Read(./.env)` and `Read(./.env.*)`**
Without this rule Claude reads `.env` *without any prompt at all*. File reads inside the
working directory are treated as read-only and are auto-approved in default mode, so the deny
rule is the only thing standing between Claude and the file. A natural first move when asked
"why does the server not start?" is to open `.env` to check the configuration. The moment it
does, every secret in the file is in the conversation transcript, which is stored on disk and
can be synced to claude.ai. From there it can be echoed into a summary, pasted into a commit
message, written into `CLAUDE.md`, or dropped into a PR description, and none of those steps
would prompt me. The rule also covers Grep, Glob, and `@file` mentions. The cost is that
`.env.example` is blocked too; I accepted that because the file has one variable, `PORT`,
which is already documented in `CLAUDE.md`.

**`Read(**/*.pem)`, `Read(**/*.key)`, `Read(~/.ssh/**)`, `Read(~/.aws/**)`**
These files live outside the project, so Claude would have to ask before reading them, but a
single mis-click on "Yes" is enough. With a deny rule, a wrong click does nothing. Private keys
and cloud credentials are the kind of secret where one leak is a full incident.

**`Bash(printenv:*)` and `Bash(env)`**
The file rules do nothing if Claude prints the environment instead. My shell exports tokens
(for example a `GITHUB_TOKEN` or an API key for another project), and `printenv` dumps every
one of them into the transcript in a single command.

**`Bash(git push --force:*)` and `Bash(git push -f:*)`**
A force push rewrites remote history. On a shared branch it silently deletes other people's
commits; on the branch the course reviews, it can erase exactly the history the reviewer is
supposed to look at. The dangerous part is how easily it slips through: an allow rule for
`git push` written for convenience matches `git push --force` too, because rules match on the
command prefix. One "Yes, and don't ask again" on an ordinary push has the same effect. The
deny rule closes that gap regardless of what the allow and ask rules say.

**`Bash(rm -rf:*)`**
Recursive deletion has no trash bin and no undo. The realistic failure is not malice but a
wrong path: "clean up the build output" that resolves to the repository root takes
uncommitted work with it.

## 3. The secrets hook

Deny rules for Bash match the start of a command, so they cannot catch every way of printing
a secret: `head .env`, `cat ./.env`, `echo $API_KEY`, or
`node -e "console.log(process.env)"` all slip past a rule written for `cat .env`.

To close that gap, `.claude/settings.json` registers a `PreToolUse` hook on the Bash tool that
runs `.claude/hooks/block-secrets.js` before every shell command. The script reads the command
and blocks it (exit code 2, with a message back to Claude) if it references any `.env` file,
dumps the environment with `printenv`, `env`, `set`, `export -p`, or `declare -p`, prints the
whole `process.env` from Node, or expands a variable whose name contains `KEY`, `SECRET`,
`TOKEN`, `PASSWORD`, or similar. Everything else passes through to the normal permission
rules. I chose Node for the script because this is a Node project, so the hook has no extra
dependency.

Evidence it works: during setup the hook blocked Claude's own commands twice, each time a
heredoc happened to contain the string `.env`. A 25-case test then confirmed that 13
dangerous commands are blocked, 11 ordinary ones such as `npm test`, `git status`, and
`echo $PORT` pass, and malformed input fails open instead of breaking the session.

The known trade-off is a few false positives, such as `cp .env.example .env`, which is
blocked because it references `.env`. I am fine doing that step by hand.

## 4. Shared vs personal settings

Also I add `settings.local.json` file with some other secrets validation the complete path is
`.claude/settings.local.json` holds rules that are mine alone and must not be imposed on
anyone else. Right now it allows `npm install` and `npm run dev` without a prompt. It is
git-ignored, so it never reaches the PR.

While setting that up I found that the repo's `.gitignore` was broken: every line after the
first had leading spaces, and git treats leading whitespace as part of the pattern. In
practice `.env` and `.claude/settings.local.json` were **not** ignored, despite what the README
says. I rewrote the file without the indentation, added `.idea/` and `*.swp`, and confirmed
with `git check-ignore` that all of them are now excluded. A `git add --dry-run` stages only
the intended files.

## 5. Verification

- [x] `claude --version` runs and I am signed in.
- [x] `/memory` opens `./CLAUDE.md`, confirming it is loaded as the project memory.
- [x] `/permissions` lists the allow, ask, and deny rules from `.claude/settings.json`.
- [x] Single-test commands, `npm test`, and `npm run lint` all run as documented.
- [x] The hook blocks secret-reading commands and passes ordinary ones (25-case test).
- [ ] Fresh session: ask "How do I run the tests here?" and check the answer comes from
      `CLAUDE.md` without any extra explanation from me.
