# Notes

## CLAUDE.md: What was included and why
Included the basics so people know how to run the project and what files do what. Left out security details (that's handled elsewhere), database setup, and deployment info since this is just a starter project.

## Permission rules: What was added and why
We blocked two dangerous things: force pushes (could lose other people's work) and reading secret files like .env (could expose passwords). We auto-allow running tests and reading code, but ask for approval before pushing anything.
