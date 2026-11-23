## CLAUDE.md
I started from the /init draft and kept a line only if Claude would do something wrong without it.

Kept: the commands, including the single-test command, since Claude wouldn’t guess that syntax. The CommonJS rule, because Claude uses import by default. The rule that routes never touch data directly, because that’s the main architecture rule of this project. The error format. Supertest instead of a real server. The note that the store resets and is shared between tests.
Cut: the boilerplate line at the top, because Claude already knows what CLAUDE.md is for.
Added: “Don’t change package.json or dependencies unless I ask.” Why: npm install suggested npm audit fix, which would change dependencies, and that’s outside the task.


## Permission rules 

Allow - Bash(npm test:*), Bash(npm run lint:*), Bash(node --test:*) -because they only run tests and checks and don’t change any files. 
Ask - Bash(git push:*), Bash(npm install:*) - pushes changes. npm install changes dependencies, which matches my CLAUDE.md rule not to touch package.json without asking.
Deny - Read(./.env), Bash(cat .env:*), Bash(git push --force:*), Bash(git push -f:*) - Can't read .env, without it, Claude could read real secrets like passwords or API keys and show them in the chat or use them. A force-push could overwrite other people’s work on GitHub.
Claude starts in auto mode and decides on its own what’s low-risk. Deny rules are a fixed line that holds whatever mode Claude is in.

After restarting Claude, /memory showed my CLAUDE.md as loaded and /permissions listed my allow, ask and deny rules.