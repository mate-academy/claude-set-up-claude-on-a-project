1. Removed "This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository." from CLAUDE.md as it provides no benefit.
2. Left only "Starter Express API used for the Claude Code course — a small REST API for practicing Claude Code setup, not a production app." as a short project description
3. Left all the cmd as they are useful
4. Left CommonJS, route and db/store conventions so the new code is consistent
5. Added convention about covering new route changes by tests
6. In architecture left only notes about an entry point, and that db in in-memory, removing excessive explanations

Permissions:
1. Allowed tests running, as it's a default routing to verify whether any change is working and doesn't break existing codebase.
2. Denied reading .env file as it can expose secrets.
3. Denided force push to repo, as this command can override the project irrevertably
4. Ask for git push, as this cmd should be available for the Claude, but needs human approval on readiness