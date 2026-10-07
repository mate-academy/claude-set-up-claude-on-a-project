# Setup notes

## Scope of this submission
This is a theoretical Claude Code setup example with actual configuration files. Claude Code is installed, but the account requires a paid plan to execute the exercise. I have not run `/init`, `/memory`, `/permissions`, or a Claude conversation, and do not claim that the runtime verification succeeded.

## CLAUDE.md choices
I included the actual dev, test and lint scripts from package.json, concrete CommonJS and resource-router conventions, JSON error/test expectations, and the entry point/store/test map. I left out repository history, one-off tasks, long documentation and secret values: these do not belong in the context loaded for every session. The app code is unchanged.

## Permission choices
Allow covers routine tests and lint. Ask requires confirmation before a push. Deny blocks reading `.env` and the illustrated force-push command, which could expose credentials or overwrite shared history if allowed. Deny takes precedence over allow. These rules are shared in `.claude/settings.json`; personal overrides belong in the ignored `.claude/settings.local.json`. These examples are not a complete security sandbox against all shell access or alternate destructive command spellings.

## Expected verification in an available Claude session
Start `claude` from the repository root in a fresh session. `/memory` should list the root CLAUDE.md, and `/permissions` should list the allow, ask and deny rules above. Asking "How do I run tests here?" should produce `npm test` from the instructions. These are expected outcomes, not recorded execution results. A real runtime check remains pending until Claude Code access is available.
