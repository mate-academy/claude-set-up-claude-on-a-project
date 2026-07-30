# NOTES.md

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

I kept the CLAUDE.md focused on the information Claude needs for everyday work: a short project description, the main development commands, coding conventions, and a brief overview of the project architecture. I deliberately left out one-off notes, CI details, and other information that can be inferred from the repository because shorter instructions are easier for Claude to follow and maintain.

## Which permission rules did you add, and what could go wrong without your deny rule?

I allowed `npm test` and `npm run lint` so Claude can run common verification commands without asking. I configured `git push` to require confirmation before pushing changes. I denied reading `.env` files and force-pushing with Git. Without the deny rules, Claude could accidentally expose sensitive environment variables or overwrite remote Git history with a force push.


1. db/store.js — modified, breaks the build
 let nextId = 3;
+print nextid
This is not valid JavaScript — print nextid isn't a statement, and ESLint confirms it's a parse error (Unexpected token nextid). This will crash anything that requires db/store.js (i.e. the whole app). Almost certainly an accidental paste.

2. NOTES — копия.md — new, untracked file
Content is just:
Prediction:

I added print
This looks like a stray autosave/duplicate of NOTES.md (note the non-breaking space in the filename and the em dash — typical of a "save as copy" from an editor). The text "I added print" lines up suspiciously with the broken print nextid line above — likely both came from the same accidental edit/paste event.

Flagged as unintended:
- The print nextid line in db/store.js — should be removed, it breaks lint and would break the app at runtime.
- The NOTES — копия.md file — looks like debris, not an intentional note; probably safe to delete unless you meant to keep it.