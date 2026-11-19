# Setup notes

`CLAUDE.md` describes the API, common commands, conventions already used in the code, and where the app, routes, and data live. I left out secrets, one-off instructions, and details that are easy to find in the source, so the guidance stays useful and concise.

The shared settings allow `npm test`, ask before `git push`, and deny Claude's Read tool access to the root `.env`. Without the deny rule, Claude could read credentials from that file. This rule is not a complete secret-protection boundary: shell commands and other tools may still be able to access the file, so avoid putting secrets into prompts or logs.

Claude Code is installed, but `claude auth status` reports that this machine is not signed in. The `/memory` and `/permissions` checks and a fresh-session test question remain to be verified after signing in; they have not been confirmed yet.

The existing `.gitignore` has leading spaces before `.env` and `.claude/settings.local.json`, so Git does not ignore those paths as the README claims. Keep them out of commits and correct the ignore patterns before creating either file.
