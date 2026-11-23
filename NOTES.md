## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
- A short one-line description what this project is.
- Commands section with two command (npm run dev, npm test)
- Convention seciont with two definitions (Use CommonJS, Write tests with `node:test`...)
- Architecture section with three definitions (`server.js`, `routes/`, `db/store.js`)

I deliberately leave out some definitions from the init/default version. Just for making it cleaner and shorter for this first exercise.

## Which permission rules did you add, and what could go wrong without your deny rule?

I added permission rules:
- Allow: "Bash(npm test:*)"
- Ask: "Bash(git push:*)"
- Deny: "Read(./.env)"

Without a deny rule, secrets stored in the .env file could be compromised.