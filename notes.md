# NOTES.md
## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
I included a one-line description, the main commands (dev, test, lint), the architecture (server.js entry point, routes per resource, db/store.js for data), and conventions (error handling, lint rules). 
I did not add any implementation details as they are obvious from reading the code, and any sensitive information.
## Which permission rules did you add, and what could go wrong without your deny rule?
I added an allow /i wrule for npm test (safe, runs tests),  Ask rule for git push (confirms before pushing), Deny rules for reading .env (protects secrets),  Deny rules for git push --force (prevents accidental history rewrites) (Without the deny rule for .env, Claude could accidentally read and expose API keys or passwords.)
