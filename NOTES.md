# Setup Notes

## CLAUDE.md

I included a one-line project description, the development commands, concrete CommonJS and routing conventions, and a brief map of the server, routes, and data store. I left out details that are obvious from the code, one-off setup instructions, and sensitive information so the file stays useful and concise.

## Permission rules

I allowed `npm test`, require confirmation before `git push`, and denied reading `.env` or force-pushing. Without the deny rules, Claude could expose local secrets or rewrite remote Git history and destroy other contributors' work.
