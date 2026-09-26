# NOTES.md



## (a) What I included in CLAUDE.md

- The four commands Claude needs: dev, full test run, single test by name, and lint.

- Conventions written as explicit "use X, not Y" rules: CommonJS, the node:test/supertest stack, data access via db/store.js, the JSON error shape, route comments, and .env handling.

- Architecture points Claude can't easily infer: why server.js only listens when run directly, and that store state is shared across tests, so counts and IDs aren't fixed.



## (b) What I deliberately left out, and why

- CI workflow detail (Node version, job steps in ci.yml). Claude doesn't need it day to day; one line saying lint and tests must pass covers it.

- ESLint version and config specifics. Running `npm run lint` is enough, and the config is readable in `.eslintrc.json` if needed.

- Verbose test patterns and example test code. Claude can read the existing tests in `tests/`.

- The boilerplate intro line. It adds nothing.

- Why: CLAUDE.md loads into every session, so every line costs context and dilutes the rules that matter.



## (c) Deny rules in .claude/settings.json and what they protect against

- `Read(./.env)`: blocks Claude from reading secrets. Without it, API keys or passwords could appear in output, logs, or be copied into code or commits.

- `Bash(git push --force:*)`: blocks force-pushes. Without it, remote history could be overwritten and teammates' commits lost.



## (d) Verification

- Ran `/memory` and confirmed CLAUDE.md is listed as loaded project memory.

- Ran `/permissions` and confirmed both deny rules are listed.

