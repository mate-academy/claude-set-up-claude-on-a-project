# Claude Code Setup Notes

## CLAUDE.md
I included a short project description, development commands,
coding conventions, and an overview of the project architecture.

I left out secrets, lengthy documentation, and one-off tasks
to keep the instructions focused and useful across sessions.

## Permissions
I allowed `npm test` so Claude can run the tests without
requesting permission each time.

I added an ask rule for `git push` so publishing changes
requires my approval.

I denied reading `.env` because it may contain credentials
or other sensitive configuration.

## Verification
- Claude Code installation: [result of `claude --version`]
- Sign-in: [whether I successfully signed in]
- `/memory`: [whether CLAUDE.md appeared as loaded]
- `/permissions`: [which allow, ask, and deny rules appeared]
- Asked Claude how to run the tests: [whether it answered
  correctly with `npm test`]
