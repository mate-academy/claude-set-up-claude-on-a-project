I cut what is obvious from the code itself:
"server.js — Express app entry point" - the filename plus a 5-second read tells Claude that.
"routes/ — one file per resource... each exporting an express.Router()" - visible  from listing the folder and opening one file.
"tests/ — mirrors the route structure" - same, obvious from ls tests/.
The db/store.js function names (getAllUsers, getUserById, createUser) - Claude will see these the moment it opens the file.

I cut one-off note:
The CI line - it's trivia, not instruction.

I added next permissions:
To `allow` "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)", they're the equivalent of Claude "looking around. Three confirmed safe commands, so Claude Code doesn't interrupt me for things i already run freely by hand.
To `ask` "Bash(git commit:*)", "Bash(npm install:*)", things that change shared state, I want eyes on it but it's not inherently dangerous. npm install belongs here rather than allow because installing a new package is a decision, not a routine action.
To `deny` "Bash(rm -rf:*)", "Bash(git reset --hard:*)", irreversible or catastrophic actions. 

What goes wrong without the `deny` rules?
Without them, those commands fall through to normal Claude Code behavior, which for many setups means "ask" at best.
`ask` protects me from Claude Code doing something without your knowledge. `deny` protects me from Claude Code doing something even with my blessing in the moment. Human makes mistake. "I approved it while tired/rushed/mid-flow" isn't an acceptable failure mode.