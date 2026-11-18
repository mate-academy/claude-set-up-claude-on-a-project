# Notes

## What I put in `CLAUDE.md`, and what I left out

My `CLAUDE.md` has a one-line project description, the commands I run most often, four conventions, and a short architecture overview. The conventions cover mistakes Claude could make without being told, such as using `import` in a CommonJS project or looking up a user with a string ID when the store compares numbers.

I left out anything Claude can quickly learn from the code, such as which test libraries the project uses. I also removed one-off course notes and the warning that names files missing from `.gitignore`, because that detail is sensitive and the fix belongs in `.gitignore`. Claude reads this file every session, so a shorter file keeps the important rules from getting lost.

## Which permission rules I added, and why the deny rules matter

In `.claude/settings.json`, I allow `npm test` so tests run without a prompt, and I require confirmation for `git push`. I deny reading `.env` with the Read tool, and I deny force-pushes using `--force` or `-f`.

Without the deny rules, Claude could read secrets from `.env` into the conversation, or a force-push could overwrite commits on the remote and destroy other people's work. These rules reduce the risk but don't remove it. A shell command like `cat .env` isn't covered by the Read rule, so real secrets should still be kept out of the project folder.

## Verification

`/memory` listed `./CLAUDE.md` under project instructions, which confirmed that Claude Code loaded this project's `CLAUDE.md`.

The Allow tab in `/permissions` showed `Bash(npm test)` and `Bash(npm test *)`, and the Ask tab showed `Bash(git push *)`. The Deny tab showed `Read(./.env)`, `Bash(git push *--force*)`, `Bash(git push -f*)`, and `Bash(git push * -f*)`, which confirmed that all of the project's rules were loaded.
