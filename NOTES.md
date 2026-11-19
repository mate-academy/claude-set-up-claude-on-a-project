# Setup notes

`CLAUDE.md` describes the API, common commands, conventions already used in the code, and where the app, routes, and data live. I left out secrets, one-off instructions, and details that are easy to find in the source, so the guidance stays useful and concise.

The shared settings allow `npm test`, ask before `git push`, and deny Claude's Read tool access to the root `.env`. Without the deny rule, Claude could read credentials from that file. This rule is not a complete secret-protection boundary: shell commands and other tools may still be able to access the file, so avoid putting secrets into prompts or logs.

Claude Code 2.1.318 is installed, but `claude auth status` reports that this machine is not signed in. No Claude subscription or API access was available for this exercise. I prepared the files by inspecting the codebase and Claude Code's settings documentation rather than using `/init`. The `/memory` and `/permissions` checks and a fresh-session test question could not be run, so loading and enforcement have not been confirmed in Claude Code.

I validated the settings as JSON, ran `npm test` (all four tests passed) and `npm run lint`, and started the API and checked that `/health` returned `{"status":"ok"}`. These checks validate the project and file syntax, but they do not replace the Claude Code session checks.

The existing `.gitignore` has leading spaces before `.env` and `.claude/settings.local.json`, so Git does not ignore those paths as the README claims. Keep them out of commits and correct the ignore patterns before creating either file.
