---
name: pr-description
description: Write a pull request description in our house format (What changed / Why / How to test, plus Risks when there are any). Use whenever a PR description is needed — when asked to write, draft or "write up" a PR, open or create a pull request, run `gh pr create`, or summarise a branch for review — even if the user doesn't say "description".
---
# PR description

Reviewers skim. The house format puts the three things they need first, in a fixed order, so every PR reads the same.

## Gather the change

Work from what the user gave you (a diff, notes, commit messages). If they gave nothing, read the branch yourself: `git log <base>..HEAD` and `git diff <base>...HEAD`, where `<base>` is usually `main`. Look at the project's `CLAUDE.md` or `package.json` for the real test command, rather than guessing one.

## Format

Use bold labels, in this order, with no title heading (the PR title is a separate field):

```markdown
**What changed**
GET /orders now returns 50 orders per page, with a `?page=` parameter and a `next` link.

**Why**
Closes #31. Large accounts were timing out loading every order at once.

**How to test**
1. `npm test` — the new pagination tests should pass.
2. `curl -s "localhost:3000/orders?page=2"` returns the second 50 and a `next` link.

**Risks**
Clients that expected the full list from one call will now only get the first page.
```

**What changed** — one or two sentences about the behaviour, not a per-file list. The diff already shows the files; the description says what is different for someone using the code.

**Why** — the reason. If a commit or the user mentions an issue, start with `Closes #N`. Never invent an issue number or a backstory; if no reason is given, state the plain motivation the change makes obvious ("The API had no way to remove a user.") or skip the section.

**How to test** — the exact steps a reviewer runs, using commands that exist in this project. Match the effort to the change: for docs, comments or other changes with nothing to execute, either say "Read the rendered README" or skip the section — don't add steps that start the server or run the test suite just to have something there.

**Risks** — only when this PR introduces something a reviewer could genuinely miss: a new way for a request to fail, a behaviour change that could break existing clients, data that can't be undone. To find them, read the added lines and ask "what input now breaks this?" — e.g. a method called on a value the existing validation doesn't check the type of. Leave out things that were already true before this PR (no auth, in-memory storage); they aren't this change's risk. Omit the section entirely if nothing qualifies. A padded Risks section ("None", or a generic concern) teaches reviewers to ignore it.

Skip any section that doesn't apply. Most PRs land around 50–150 words; if you're well past that, cut detail the diff already shows.
