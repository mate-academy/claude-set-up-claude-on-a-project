# About CLAUDE.md

The CLAUDE.md in this repository contains a short description of what the app is about, and very concise sections on commands, architecture and conventions.

The Commands section lists the most used commands for Claude to work on the app i.e. to run the app or to run the tests or to check the code style with a linter.

The Architecture section explains the basic structure of the app to let Claude know how to extend the app in consistent manner and following the existing practices. 

The Conventions section contains instructions on coding style to stay consistent with the existing style and tools used.

Dependencies and their exact versions were not included, since they can be checked from package.json. Generic coding advice such as "write clean code" was not included either because it is subjective and does not tell Claude what/how to do. If any generic advice is given, it should go to the global ~/.claude/CLAUDE.md instead.

# About permission rules

The following rules were specified in this repository:
- an allow rule to let Claude run tests with "npm test" without asking, as it cannot break anything.
- a rule to ask before pushing, so that the author can check commits before Claude pushes anything
- a deny rule to block Claude from reading ./.env that could contain secrets
- a deny rule to prevent Claude from force pushing anything, because overwriting version history should be left for the author and be done with extreme care

The /memory command shows CLAUDE.md as loaded and the /permissions command shows the above rules.
