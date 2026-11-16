# Setup notes

## CLAUDE.md choices

I kept the project summary, development and verification commands, concrete coding conventions, and the main architectural boundaries. I removed the generic introduction, extra commands for running individual tests, and minor lint configuration details to keep the instructions concise.

The file contains no secrets or one-off tasks. It directs Claude to use .env.example rather than read .env.

## Permission choices

I allowed the exact Bash commands `npm test` and `npm.cmd test` for routine testing. I added an ask rule for `git push` and deny rules for reading `.env` and for the command prefixes `git push --force` and `git push -f`.

Without these deny rules, Claude could read sensitive configuration or attempt a force push that overwrites remote history. These rules cover the specified tools and command patterns; they are not a complete security boundary for every possible way to access a file or invoke Git.

In the new session, `/permissions` also displayed PowerShell under Deny. I did not add separate PowerShell allow rules.

## Verification

- Claude Code is installed and authenticated.
- `npm.cmd install` completed.
- `npm.cmd test` passed all four tests.
- `npm.cmd run lint` completed without errors.
- The development server returned `{"status":"ok"}` at `/health`.
- In a new Claude Code session, `/memory` displayed the project's `./CLAUDE.md`.
- `/permissions` displayed the test-command allow rules and the deny rules.
- Claude correctly explained the test commands and coding conventions from CLAUDE.md without additional project explanations.
- The shared settings file contains the ask rule for `git push`.

## Existing issues

The installation reported six dependency vulnerabilities. I did not run `npm audit fix`, because dependency changes are outside this setup task.

An earlier inspection found leading spaces in .gitignore patterns affecting `.env` and `.claude/settings.local.json`. The file was left unchanged. These sensitive or personal files must not be included in the submission.
