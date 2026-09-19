# Setup Notes

### CLAUDE.md Choices
I included essential dev commands (`npm run dev`, `npm test`, `npm run lint`), core architecture details (`server.js`, `routes/`, `db/store.js`), and basic JavaScript conventions. I intentionally omitted one-off setup steps, temporary debug notes, and sensitive environment configs to keep the instructions clean, focused, and token-efficient for every session.

### Permission Rules & Security
I added `npm test` to `allow` because running tests is safe and frequent. I set `git push` to `ask` to maintain control before sending changes remote. I added `deny` rules for `Read(./.env)` and `git push --force` to prevent unintended exposure of secrets and accidental destruction of git history. Without the `deny` rule for `.env`, an automated session could accidentally read and expose private environment keys in logs or responses.
