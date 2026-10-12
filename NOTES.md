### CLAUDE.md
I have added CLAUDE.md by using the /init command in claude.
I removed the introduction written by claude and replaced it with the project name and description.
I removed single file testing because it's not needed from CLAUDE.md
Replaced the error handling from code specific to have general on the level of the whole project.
Removed reading or commiting .env file since it is denied access in permissions.
I left out detailed onboarding steps since they're obvious to me, and I omitted project history since it's not relevant to day-to-day work.

### Permissions
I have added .claude/settings.json manually, where I enabled linting and testing, and I prohibited reading from envirnoment files.
Claude is granted to access to run the project, and run tests
Claude is denied access to read environoment variables as it contains secrets - Not doing so, Claude could read and expose API keys or database credentials from .env files.
Claude is denied pushing to main and production branches. - Not doing so, Claude may shift code to production that may not be reviewed properly causing major problems.
The deny rules prevent Claude from reading `.env` files, which could contain production API keys or database passwords that should never be shared, because `.env` files typically contain sensitive data like API keys, database credentials, and tokens. Without the deny rules, Claude Code could read and potentially expose these secrets.

### Memory and Permissions
When running /memory I was able to access CLAUDE.md content. CLAUDE.md was loaded and showed the project description.
/memory showed Project Instructions, User instructions, Project Instructions showed my CLAUDE.md content.

When runnning /permissions I was able to see the rules I have added in .claude/settings.json
/permissions showed me Bash(npm run lint) allowed and Bash(npm run test:*) allowed which are two permissions added in settings.json
