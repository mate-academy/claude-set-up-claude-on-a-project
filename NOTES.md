# NOTES.md

- CLAUDE.md contains guidelines for Claude to work on this repo. It contains a short description of the project (What this projec is), lists the commands used to run this project (Commands), a short description of its architecture (Architecture), and a list of conventions to be used (Conventions)
- I didn't trim anything from what Claude wrote initially. I believe it is concise, and summarizes the purpose, commands, architecture and conventions in a clear way. 
- I added the following permission rules:
    - Allowed Claude to run tests via `npm test *`
    - Required Claude to ask for permission when pushing to git via `git push *`
    - Denied Claude from reading my `.env` file (my secrets), and from rewriting my git history via `git push --force *`
- The permission rules I've added prevent Claude from reading my secrets, rewriting my git history, while allowing it to run tests using `npm test *`. They also require my intervention when pushing to git.
