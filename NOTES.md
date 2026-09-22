# Included in CLAUDE.md

The explicit use of npm for this project, as opposed to pnpm as currently specified in my global settings.

# Excluded from CLAUDE.md

The following was excluded since it does not directly guide Claude in further debelopment of this project: The `app.listen()` call is guarded by `require.main === module` so importing `server.js` doesn't bind a port. That guard is what lets `tests/users.test.js` do `require("../server")` and drive the app through `supertest` with no server running — keep it if you touch startup.

The purpose statement of the CLAUDE.md file was excluded since it does not guide Claude in further debelopment of this project.

# Permissions rules added

- Allow npm test to not delay the testing.
- Ask first before push to the git remote repository so as to not push unintended changes.
- Deny removing all file from this project and deny a forced git push of changes. Without these deny rules, a breaking change could reach the remote respository and cause downstream CI/CD issues.