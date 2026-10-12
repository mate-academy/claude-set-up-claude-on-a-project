---
name: check-online-repo
description: Compare the local branch with its online (remote) counterpart and report missing or extra commits. Use when asked to check the online repo, check the remote, or whether the local repo is up to date.
---
# Check online repo

1. Run `git fetch` to get the latest state of the online repo. Do not pull, merge, or push.
2. Find the remote branch with `git rev-parse --abbrev-ref --symbolic-full-name @{u}`. If there is no upstream, use `origin/<current branch>`.
3. List the commits on each side:
   - Missing (online ahead): `git log --oneline HEAD..@{u}`
   - Ahead (local ahead): `git log --oneline @{u}..HEAD`
4. Report using exactly these messages:
   - Both lists are empty: print `You are good.`
   - Only missing commits: print `You are missing following commits:` followed by the list.
   - Only local commits: print `You are ahead with this commits` followed by the list.
   - Both (the branches have diverged): print both messages, each with its list.

Show each commit as `<short hash> <subject>`. Don't add anything else. If the fetch fails (for example, there's no network or no remote), say so and stop.
