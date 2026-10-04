# NOTES.md

## What went into CLAUDE.md, and what I left out

The file has four parts: a one-line description of the project, **Commands**, **Conventions**, and **Architecture**.

Under Commands I kept the three npm scripts plus the two ways to run a single test (`node --test tests/users.test.js` and `node --test --test-name-pattern="..."`), because those aren't visible in `package.json` — the `test` script is a bare `node --test`, so without this note Claude would have to guess the filtering syntax. I also noted that CI runs lint before tests, so a failing lint blocks the build.

The Conventions are five rules I could point at real code for, each phrased as "use X, not Y" so Claude can act on them without asking: CommonJS rather than ESM, Node's built-in test runner rather than Jest or Mocha, route handlers going through `db/store.js` instead of touching data directly, keeping `server.js` free of import-time side effects, and writing route paths relative to the mount point. The last three are the ones that actually prevent bugs — the `require.main === module` guard is what lets the tests import `app` without binding a port, and it would be easy to break without knowing why it's there.

Architecture is a few lines on the `server.js` → `routes/` → `db/store.js` flow, plus the two consequences of the store being in memory: state resets on restart, and it's shared across tests in a process, so tests that create users aren't isolated.

**Deliberately left out:**

- *A file-by-file listing of the repo.* Anyone can get that from `ls`. Restating it costs context on every single session and goes stale the moment a file moves.
- *The course instructions from the README.* They're a one-off task list, not a durable fact about the codebase. Once this project is set up they'd be pure noise.
- *Generic development advice* ("write tests", "handle errors", "don't commit secrets"). Claude already does these; spelling them out dilutes the rules that are actually specific to this repo.
- *Setup steps like `npm install` and how to open a terminal.* Useful in a README for a human arriving cold, useless to an agent already running in the project folder.
- *A note about the `.gitignore` bug I found* (see below). It's a real problem, but it's a thing to fix once, not a standing rule — and a CLAUDE.md that accumulates one-off observations stops being read.

The guiding filter was: would this change what Claude does, on more than one occasion? If not, it got cut.

## Permission rules, and the risk the deny rule covers

`.claude/settings.json` has three rules:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "deny":  ["Read(./.env)"],
    "ask":   ["Bash(git push:*)"]
  }
}
```

**Allow `npm test:*`** — the command I run most, it's read-only with respect to my source, and approving it by hand every time trains me to click "yes" without reading, which is how a genuinely dangerous command eventually slips through.

**Ask on `git push:*`** — pushing is outward-facing and hard to walk back once a branch is public, so I want a deliberate beat before it happens. Not a deny, because pushing is the normal end of my workflow.

**Deny `Read(./.env)`** — without it, `.env` is just another file in the project, and Claude reads project files freely while working. A plausible failure: I ask for help debugging a database connection, Claude reads `.env` for context, and the real `DATABASE_URL` — password included — lands in the session transcript. From there it leaks by ordinary, well-intentioned means: pasted into a commit message, quoted in a PR description, included in a bug report. Nobody has to do anything careless; the secret just ends up somewhere it can't be recalled.

What makes this worth more than a theoretical note: **`.env` is not actually git-ignored in this repo.** `.gitignore` lists it as `   .env` with leading spaces, which Git treats as part of the pattern, so the rule matches nothing:

```
$ git check-ignore -v .env
$ echo $?
1          # no matching rule
```

The README states `.env` is ignored, and I'd have believed it. So the deny rule is currently the only thing standing between a real secrets file and the transcript — and the `.gitignore` is the only thing that would have stopped it reaching a commit, and it doesn't work. The two guard different paths, which is exactly why having only one of them isn't enough. Stripping the leading whitespace from `.gitignore` is the actual fix; the deny rule is the belt to its braces.
