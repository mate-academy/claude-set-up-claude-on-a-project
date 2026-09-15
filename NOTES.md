# Notes

## CLAUDE.md

I included the project description, commonly used npm commands,
project conventions, and the basic architecture.

I deliberately left out information that Claude can determine directly
from the source code, one-off task instructions, and sensitive information.
The goal is to keep CLAUDE.md concise and useful.

## Permission Rules

I allowed `npm test` because running the test suite is a safe and
frequently used operation.

I added a deny rule for reading `.env` because environment files may
contain secrets.

I added a deny rule for `git push --force` because force-pushing can
rewrite remote Git history.

I added an ask rule for `git push` so that a remote change requires
confirmation.

## Verification

I verified that `/memory` loads CLAUDE.md and that `/permissions`
shows the configured permission rules.