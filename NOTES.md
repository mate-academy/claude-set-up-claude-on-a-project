# NOTES

## CLAUDE.md — what I kept and what I cut

I kept four lean sections: a one-line description, the three commands I actually run
(`npm run dev`, `npm test`, `npm run lint`), conventions written as rules Claude can
follow without asking (CommonJS not ESM, double quotes, data only through
`db/store.js`, `400`/`404` `{ error }` responses, env config via `.env.example`), and
a short architecture note (`server.js` entry point that only listens when run directly,
one router file per resource in `routes/`, `db/store.js` as the single in-memory data
layer, tests run against the imported `app`).

I left out anything discoverable by reading a file: the dependency list, the folder
tree, Node version, and the CI YAML contents. I also cut the course/submission
instructions from the README (one-off, not architecture) and anything sensitive. The
value is in the non-obvious rules and how the pieces fit together, so shorter makes
those stand out.

## Permission rules

`.claude/settings.json`:

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)`, `Bash(npm run dev:*)` — safe,
  read-only-ish commands I run every session; allowing them removes repeated prompts.
- **ask**: `Bash(git push:*)` — pushes are fine but I want to confirm the branch and
  remote each time.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)`, `Bash(git push --force-with-lease:*)`.

Without the `Read(./.env)` deny, real secrets could be pulled into the model context
and end up echoed into a commit, a log, or a PR description. Without the force-push
deny, one bad command could overwrite shared history on the remote and destroy
teammates' commits — an action that is hard to undo.
