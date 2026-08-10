## What I included / didn't include
- I included the project's purpose, the exact commands to run it and test it, a map of where things live and why (like why server.js exports the app without listening), and the naming/structure conventions I want followed so generated code doesn't drift from the rest of the codebase. I deliberately left out permission rules like deny-listing .env reads or force-pushes — that's not project context, it's tool policy, so it belongs in .claude/settings.json, not CLAUDE.md. I also skipped things like full API docs or a change log, since those go stale fast and I'd rather Claude read the actual code than a description of it that's drifted out of sync.

## Without Read(./.env) deny:
- Claude could read the .env file while exploring the project (e.g. while debugging a config issue) and then echo secrets back into the conversation — API keys, database URLs, JWT secrets, cloud credentials all end up in chat history/logs.
- If the project has any prompt-injection surface (a README, a fetched webpage, a malicious dependency's postinstall script, an issue Claude is asked to summarize), an attacker-controlled instruction could trick Claude into reading .env and exfiltrating it 
-Secrets could end up committed accidentally if Claude generates a commit or file that includes them.

## Without Bash(git push --force:*) deny:
- A force push rewrites remote history — if Claude does this on a shared branch (main, a colleague's branch), it can silently discard other people's commits. They won't get a merge conflict; their work just disappears from the remote.
