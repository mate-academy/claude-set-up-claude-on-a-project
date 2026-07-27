# NOTES.md

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

I kept the CLAUDE.md focused on the information Claude needs for everyday work: a short project description, the main development commands, coding conventions, and a brief overview of the project architecture. I deliberately left out one-off notes, CI details, and other information that can be inferred from the repository because shorter instructions are easier for Claude to follow and maintain.

## Which permission rules did you add, and what could go wrong without your deny rule?

I allowed `npm test` and `npm run lint` so Claude can run common verification commands without asking. I configured `git push` to require confirmation before pushing changes. I denied reading `.env` files and force-pushing with Git. Without the deny rules, Claude could accidentally expose sensitive environment variables or overwrite remote Git history with a force push.
