# Notes

## What's in CLAUDE.md, and what was left out

Kept: a one-line description of the project; the three commands used most (`npm run dev`, `npm test`, `npm run lint`); all conventions; architecture (the info about the server.js as an entry point, one route file per resource and data access through db/store.js)

Left out:
Additional information that was obvious from the code, because it just slows down the process, making it heavier for Claude to comprehend.

## Permission rules (`.claude/settings.json`)

- allow: `npm test`, `npm run lint` and `node --test`. They only read code and run it locally, and they're used constantly, so asking every time would use too much resource.
- ask: `git push`. Pushing publishes work to GitHub, so I want to confirm each push.
- deny: `Read(./.env)`, `git push --force` and `git push -f`.

What could go wrong without the deny rules:
- `.env`: Claude could open the file and use the secrets from the conversational context later in other files.
- Force-push: on `main` or a shared branch it could delete other people's commits.

Also, /memory shows the CLAUDE.md loaded and /permissions shows my rules.