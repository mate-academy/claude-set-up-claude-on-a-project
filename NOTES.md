## CLAUDE.md

In `CLAUDE.md`, I kept only the guidance that helps Claude work effectively in this repo: a short description of the project, the main commands I’d expect to run regularly, a few concrete coding rules, and a brief outline of how the app is structured. I intentionally left out background about the course, extra command variations, CI details, and anything that is already easy to learn by reading the code. I wanted the file to stay brief, clear, and practical.

## Permissions

In `settings.json`, I allowed `npm test`, required confirmation before `git push`, and denied access to `./.env` plus any `git push --force` command. The `/permissions` command shows those rules from the settings file. Without the deny rules, Claude could read sensitive environment values or make a destructive force-push, so those actions are better blocked completely.
