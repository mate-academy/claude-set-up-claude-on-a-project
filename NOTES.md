# NOTES

## CLAUDE.md

I kept `CLAUDE.md` to four lean sections: a one-line description, the commands I actually run (`dev`, `test`, `lint`, single-test, plus the CI gate), the architecture that takes reading several files to grasp, and the conventions Claude can't guess from a single glance.

The architecture and conventions carry the weight. The two things most likely to trip up a fresh session are that `server.js` exports `app` and only listens when run directly (so supertest can import it without a port), and that all data access must go through `db/store.js` rather than touching the users array directly. I also pinned CommonJS-not-ESM and the existing `{ error }` / 400 / 404 response shape so new routes match the old ones.

I deliberately left out the full file listing, generic Node/Express advice, and all of the README's course-task instructions — anything discoverable from the code or irrelevant to editing it. Every remaining line is specific to this repo.

## Permissions

- **allow**: `npm test`, `npm run lint`, `npm run dev` — safe, read-only-ish commands I run constantly, so Claude doesn't stop to ask each time.
- **ask**: `git push` — I want to confirm before anything leaves my machine.
- **deny**: reading `.env`, and force-push (`--force` / `-f`).

Without the `.env` deny rule, Claude could read real secrets into the conversation while poking around the project. Without the force-push deny, an "efficient" push could overwrite shared history on the remote and lose others' commits — hard to undo. The deny rules make those the one thing Claude can't do, even by accident.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow / ask / deny rules above.
- Asking "How do I run the tests here?" answers from `CLAUDE.md` (`npm test`) without extra explanation.
