# NOTES.md

## What did you put in your CLAUDE.md

I included information regarding the project and its execution.

## what did you deliberately leave out

I didn't include all the information because I wanted to keep the file small.

## Which permission rules did I add

I added 4 permissions:

    . "allow": ["Bash(npm test:*)"],
    . "ask": ["Bash(git push:*)"],
    . "deny": ["Read(./.env)", "Bash(git push --force:*)"]

## what could go wrong without your deny rule?

- Read(./.env) — Claude could read the .env file (per this repo's own CLAUDE.md, that's where real secrets live) directly into context. From there it could get echoed in output, pasted into a commit, logged, or exposed via an artifact/external tool — an accidental leak with no malicious intent required.
- Bash(git push --force:*) — Claude could force-push without asking, silently rewriting remote history and potentially discarding others' commits on a shared branch. That's destructive and hard to reverse, especially since force-push isn't gated by the ask list either.

Both are guardrails against low-probability but high-blast-radius mistakes — the deny list isn't about Claude being untrustworthy day-to-day, it's a backstop for edge cases (a misinterpreted instruction, a chained command, a bad regex match in a broader "allow").s