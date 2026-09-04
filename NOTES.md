# Notes

I kept the `CLAUDE.md` focused on the project's purpose, common commands, coding conventions, and basic architecture. I deliberately left out detailed implementation notes, CI details, and one-off information because Claude can inspect the code when needed, and shorter project instructions are easier to follow.

I added an allow rule for `npm test` because it is a safe command used often. I added an ask rule for `git push` so I can review changes before they are sent to the repository, and deny rules for `.env` and force-push because they could expose secrets or cause destructive changes.

I verified that `CLAUDE.md` is loaded with `/memory` and that the permission rules appear in `/permissions`.
