# Project Setup & Verification Notes

## Reasoning
- Documented `npm run dev`, `npm test`, and `npm run lint` in `CLAUDE.md` so Claude uses the exact documented scripts.
- Added explicit "use X, not Y" conventions to enforce single-resource route files (`routes/`) and centralized data access through `db/store.js`.
- Configured `.claude/settings.json` to pre-approve safe development, linting, and testing commands while blocking direct access to `.env` secrets.

## Verification
- Verified that `CLAUDE.md` includes a one-line project description, `npm run dev`, single-resource route structure, and `db/store.js` data access rules.
- Verified `.claude/settings.json` uses valid JSON syntax and enforces least-privilege permission rules.
