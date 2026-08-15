CLAUDE.md

I put the project overview, common development commands, coding conventions, and a short description of the project architecture in CLAUDE.md. 
It explains how routes, server.js, db/store.js, and tests are organized so Claude can follow the existing structure. 
I deliberately left out secrets, environment variables, and unnecessary generic Express/JavaScript documentation because they are either sensitive or can already be understood from the code 
and standard tooling.

Permissions

I allowed Claude to run npm test, required confirmation before git push, 
and denied access to .env as well as git push --force. 
The .env deny rule prevents Claude from reading potentially sensitive values such as API keys or credentials. 
The force-push deny rule is especially important because, without it, Claude could rewrite remote Git history and potentially remove other people's commits or published work.
