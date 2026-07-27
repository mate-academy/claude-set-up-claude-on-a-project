# What did I put in CLAUDE.md
1. One-line project description.
2. Commands to run the project, tests and the linter.
3. A command to run a single test file.
4. Basic conventions.
5. Architecture of the project.

# What I deliberately left out and why:
1. The purpose of the project — irrelevant in the scope of the task.
2. Examples of helper functions and routes — may quickly become obsolete with an active development.
3. Default value of the server port — can be easily retrieved from the codebase.

# Which permissions did I add
1. Allow for running tests using npm — a routine safe task that should be performed quite often.
2. Ask for pushing to the git repo — the operation leaves a trace in the remote repo, so it needs a human verification.
3. Deny for reading environment variables — sensitive data.
4. Deny for force push to the git repo — a risk of overwriting remote git history permanently without a possibility to restore it.