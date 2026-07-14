# NOTES

## My CLAUDE.md

I kept the `CLAUDE.md` to four short sections: a one-line description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`), the conventions this codebase actually follows, and a brief architecture note.

For conventions I chose rules Claude can act on without asking me: use CommonJS (`require` / `module.exports`) rather than ES modules, add one route file per resource, and always go through `db/store.js` instead of touching the in-memory data directly. These come from the real code, so they stop Claude from introducing a style or structure the project doesn't use.

I deliberately left out anything Claude can already learn by reading the code (I didn't paste the source in), anything sensitive (no `.env` values), and one-off task notes. The file is loaded every session, so I wanted every line to change how Claude behaves — shorter is stronger.

## My permission rules

- **allow**: `npm test` and `npm run lint` — safe, read-only-ish commands I run constantly, so Claude shouldn't have to ask each time.
- **ask**: `git push` — it sends code to GitHub, so I want to confirm it each time.
- **deny**: `Read(./.env)` and `git push --force`.

Without the `Read(./.env)` deny rule, Claude could read my secrets file into a conversation, where the secrets might leak into logs or history. Without the `git push --force` deny rule, a forced push could overwrite history on the remote and lose other people's commits. Denying both removes those risks entirely rather than relying on judgement in the moment.
