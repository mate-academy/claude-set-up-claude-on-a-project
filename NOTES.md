# NOTES.md

I kept CLAUDE.md focused on information that is useful across multiple sessions: the main project commands, coding conventions, and the repository architecture. I deliberately left out obvious implementation details, temporary notes, and sensitive information because they do not belong in persistent project instructions.

For permissions, I allowed safe and frequently used commands such as tests and linting. I added an ask rule for `git push` because it changes the remote repository and should be confirmed before execution. I denied access to `.env` and force-push commands because they may expose sensitive information or cause destructive Git changes.

I verified that `/memory` loads the project CLAUDE.md and that `/permissions` shows the configured allow, ask, and deny rules.
