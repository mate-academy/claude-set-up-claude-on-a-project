# Bluebird (RavenClaw) Notes



* I removed the line "- Install: `npm install`" from Claude.md as the installation was performed successfully.
* I removed excessive description in the header to keep it concise.



* I added the Deny rule "Do not read env file". If this was missing then Claude may read secrets or sensitive information.



Running /memory shows that Claude.md is read successfully:





> /memory

&#x20; ⎿  Opened \~.claude\\CLAUDE.md



/permissions



&#x20; Permissions  Recently blocked   Allow   Ask   Deny   Auto mode   Workspace



&#x20;  Claude Code won't ask before using allowed tools.

&#x20;  ╭───────────────────────────────────────────────╮

&#x20;  │ ⌕ Search…                                     │

&#x20;  ╰───────────────────────────────────────────────╯



&#x20;    1. Add a new rule…

&#x20;    2. Bash(npm test)







&#x20; Permissions  Recently blocked   Allow   Ask   Deny   Auto mode   Workspace



&#x20;  Claude Code will always reject requests to use denied tools.

&#x20;  ╭──────────────────────────────────────────────────────────╮

&#x20;  │ ⌕ Search…                                                │

&#x20;  ╰──────────────────────────────────────────────────────────╯



&#x20;    1. Add a new rule…

&#x20;    2. Read(./.env.\*)

&#x20;    3. Read(./.env)

&#x20;    4. Read(\*\*/.env)







