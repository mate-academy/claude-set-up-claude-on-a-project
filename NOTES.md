# NOTES

## CLAUDE.md — what I kept and what I cut

**Kept**
- A one-line description of the project (starter Express user/health API).
- **Commands** taken straight from `package.json`, including how to run a single
  test (`node --test tests/users.test.js`), so Claude never guesses tooling.
- **Conventions** written as followable rules, not vibes: CommonJS (not ESM),
  one router per resource in `routes/`, all data access through `db/store.js`,
  and the "app is importable, only listens when run directly" pattern that keeps
  the tests able to import `app` without opening a port.
- **Architecture** as a short TOGAF-structured section (Business / Data /
  Application / Technology), with Cloudflare noted as the production/technology
  layer and `db/store.js` flagged as the seam where a real store (D1/KV) slots in.

**Left out**
- Line-by-line file descriptions and anything trivially discoverable by reading
  the code, per "cut anything obvious."
- One-off tasks and session history (branch/PR steps live in git, not here).
- Secrets and env values — those stay in git-ignored `.env`; the file only points
  at `.env.example`.

## Permission rules — and what the deny rule prevents

- **allow:** the everyday, safe commands — `npm test`/`lint`/`dev`/`start`,
  `node --test`, and read-only git (`status`/`diff`/`log`). These run constantly
  and never change anything, so approving each one is pure friction.
- **ask:** `git push` — outward-facing and worth a deliberate confirm each time.
- **deny:** `Read(./.env)` and `git push --force`.
  - Without the `.env` deny, Claude could read real secrets into the transcript
    (and potentially into a summary or a commit) — a credential-leak path.
  - Without the force-push deny, a single bad command could rewrite or erase
    shared branch history irrecoverably.

## Verification
- `/memory` shows this `CLAUDE.md` loaded.
- `/permissions` shows the allow / ask / deny rules above.
