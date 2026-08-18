# NOTES

## CLAUDE.md

**Included:**
- The commands actually needed to work in this repo day-to-day (`npm run dev`, `npm test`, `npm run lint`), so Claude doesn't have to guess or grep `package.json` every time.
- Project-specific conventions that aren't discoverable from a single file in isolation: CommonJS over ES modules, the JSON-error-body-not-exception pattern for invalid input, and routing all data access through `db/store.js` instead of touching its arrays directly. These are exactly the kind of rules a model would otherwise "correct" toward more common/modern defaults (e.g. it might default to `import`/`export`, or throw on bad input) unless told this repo does it differently.
- A short architecture map (`server.js` entry point exporting `app` without `listen()`, one router per resource in `routes/`, `db/store.js` as the in-memory data layer) so Claude knows where new routes/data logic belong without exploring the whole tree first.

**Left out, deliberately:**
- Any description of *how* Express, the test runner, or ESLint work internally — that's general knowledge Claude already has; repeating it just wastes context.
- File-by-file contents or a full API reference — these are easy to re-derive by reading the actual files, and would go stale the moment a route changes.
- Deployment/infra details, since this is a minimal local API with no deployment story yet; nothing to document until that exists.

## Permissions (`.claude/settings.json`)

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- `allow: Bash(npm test:*)` — lets Claude run the test suite freely, since it's read-only/side-effect-free and needed constantly to verify changes.
- `ask: Bash(git push:*)` — pushing affects a shared remote, so it should always prompt for confirmation rather than being silently allowed.
- `deny: Read(./.env)` — blocks Claude from ever reading local secrets/credentials. Without this, an agent debugging config or "just checking why env vars aren't loading" could read the file and echo its contents back into a response, a log, or an external tool call, leaking secrets.
- `deny: Bash(git push --force:*)` — force-push can silently overwrite/destroy remote history other people depend on. Without this deny rule, `ask` on plain `git push` doesn't cover the `--force` variant, so a force-push could go through as an unmatched/ambiguous command or be approved by a rushed "yes" click without the user realizing it's destructive and irreversible.
