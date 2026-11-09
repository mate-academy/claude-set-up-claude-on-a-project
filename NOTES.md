# Rules added to CLAUDE.md
- I left untouched all options given by claude "/init" command
- Added two rules:
- - Prefer "const" instead "var" declarations where it is possible - modern JS only
 - - One route file per resource - don't combine code for different endpoints into one file

# Permissions added to ./claude/settings.json
- Allowed bash commands for testing and running in dev mode - they are safe concerning overriding files and losing information
- Allowed commands for running all tests or a group of specific tests - to support Ci/CD tasks
- Denied reading ./.env file - not to leak sensitive ingormation
- Denied force push into github repo - it is a bad practice at all
- Asked before pushing files to github repo - let me to decide about final push