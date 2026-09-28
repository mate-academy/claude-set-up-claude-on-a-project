# Notes: setting up Claude Code

## What I put in CLAUDE.md, and what I left out
I kept four short sections: a one-line description, the three commands I run all the time (dev, test, lint), the conventions Claude could get wrong without being told (CommonJS instead of ES modules, `node:test` instead of Jest, data only through `db/store.js`, the JSON error shape, and never touching `.env`), and a few lines on how the code is organised.

I left out things Claude can read from the code itself (the list of endpoints, the sample users, dependency versions), the setup steps from the README, and anything sensitive such as secrets or `.env` values. Every extra line costs context in every session, so if a line did not change how Claude would act, I cut it.

## Permission rules, and why the deny rule matters
- **Allow:** `npm test` and `npm run lint` — safe, read-only checks I run constantly, so Claude should not have to ask each time.
- **Ask:** `git push` — pushing changes what other people see, so I want to confirm it every time.
- **Deny:** reading `.env` / `.env.*`, and `git push --force` / `-f`.

Without the deny rules, Claude could read real secrets from `.env` into the conversation (and from there into logs or a commit), or force-push and overwrite history on the remote that other people depend on. Note: the `.gitignore` entries after the first line start with spaces, so git does not currently ignore `.env`; the deny rule is a second layer of protection.

## Verification
- [ ] `claude --version` runs and I'm signed in
- [ ] `/memory` shows `CLAUDE.md` loaded in a fresh session
- [ ] `/permissions` shows the allow / ask / deny rules above
- [ ] Asking "How do I run the tests here?" is answered from CLAUDE.md
