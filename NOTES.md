## CLAUDE.md choices
I included the project description, all common commands (dev, test, lint), conventions (CommonJS, node test runner, route structure), architecture (file organization), and Error Handling
Because project description is information about project, common commands, conventions, route, architecture and error handling are common rules I want for whole project, claude have to follow 
I left out one-off notes and anything specific to my local setup since this should be shared.
## Permission rules
- allow: npm test — lets Claude run tests without asking
- deny: Read .env — prevents accidental secret exposure
- ask: git push — I want to confirm before pushing
Without the deny rule for .env, Claude could accidentally read and potentially expose my API keys and database credentials.
## Verification
I verified /memory shows CLAUDE.md as loaded and /permissions displays my allow/deny/ask rules.

