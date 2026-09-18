---
argument-hint: <commit message>
description: Stage and commit changes with a logical message
---

## Why You Need a Descriptive Commit Message

Each commit you make becomes part of the project's history. A clear, descriptive message tells future developers (including yourself) **what changed and why**:

- **Code Review**: Reviewers understand the intent behind changes
- **Git Blame**: When investigating a bug, you know exactly when and why a line changed
- **Git Bisect**: When finding which commit broke something, good messages help identify the culprit
- **Documentation**: The commit history becomes a living record of how the project evolved
- **Collaboration**: Team members can understand context without asking questions

## Follow This Sequence for Each Logical Change

1. **Review current status:**
```bash
git status
```

2. **Add related files to staging area:**
```bash
git add <files>
```

3. **Preview what will be committed:**
```bash
git diff --cached
```

4. **Create commit with description:**
```bash
git commit -m "$ARGUMENTS"
```

## Golden Rule

**One commit = one logical change**. Don't create separate commits for each file—group all related files that work together for a single feature or fix into one commit.

**Bad approach:** A commit per file
```
commit 1: "Update routes/posts.js"
commit 2: "Update tests/posts.test.js"
commit 3: "Update db/store.js"
```

**Good approach:** Group related changes
```
commit 1: "Add posts resource with routes and tests"
         (includes: routes/posts.js, tests/posts.test.js, db/store.js)
```

## Good Commit Message Examples

✅ Descriptive (what + why):
- "Add Prettier config and project documentation"
- "Add posts resource with routes and tests"
- "Add health and status endpoints"
- "Update dependencies to fix security vulnerabilities"

❌ Vague (avoid):
- "Fix stuff"
- "Update files"
- "Changes"
- "WIP"
