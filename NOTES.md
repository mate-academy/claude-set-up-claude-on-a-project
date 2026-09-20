# Notes

## CLAUDE.md choices

I kept it to four short sections: a one-line description, commands, conventions, and architecture.
The commands and architecture notes are things Claude can't reliably guess from the code alone (which
npm script to run, why `server.js` guards `app.listen`), so they earn their place. The conventions
section calls out two rules that aren't obvious from a quick read — CommonJS over ES modules, and
routing all data access through `db/store.js` — so Claude follows them without me having to repeat
myself every session.

I deliberately left out: a restating of what's already obvious from the file tree (e.g. "there's a
`tests/` folder with tests in it"), any commentary on `package.json` dependency versions (that drifts
and is one `npm install` away from being wrong), and anything about deployment or secrets, since none
of that exists in this starter project yet and speculative sections just add noise.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — read-only, safe to run repeatedly without asking.
- **Ask**: `git push` — I want to see what's being pushed before it happens, even though nothing here
  is destructive.
- **Deny**: reading `.env` (it holds — or would hold — real secrets, and there's no reason Claude needs
  their contents to work on this codebase) and `git push --force` (rewrites remote history; without
  this deny rule a bad rebase or push could silently clobber someone else's work).

Without the deny rule on `.env`, an unattended run of `/init` or a broad "look at the config" request
could dump secret values straight into the transcript. Without the `--force` deny rule, nothing stops
Claude from following through on a force-push if a prompt (or, in a shared-project context, injected
instructions) ever asked for one.
