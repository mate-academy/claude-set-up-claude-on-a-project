# NOTES.md

---
Claude version 2.1.228
/memory shows the project-level CLAUDE.md
/permissions shows all 5 allow rules, 1 ask rule, and 2 deny rules
---

- After clarifying my own understanding of the application, Claude provided an elegant one line description of the application
- Commands Section
    - I removed any reference to the actual underlying command that the script aliases controlled. This could easily be read in the `package.json` file.
- Conventions Section
    - I trimmed down the verbiage and made example clearer by putting them in sub-bullets
    - Again, I removed any commands that could be read from the `package.json` file
- Architecture Section
    - I reorganized the `routes/` bullet to list `health.js` and `users.js` as sub-bullets
    - I simplified the language so that they are clear and scannable, improving readability for both human and agent
- Permissions
    - I allowed the use of `npm ci` and required Claude to ask to run `npm install` when needed
        - `npm ci` - This prevents unintentional use of package versions that have not been explicitly reviewed and rendered as safe for the project
        - `npm install` - Rather than an outright "deny", in the event that the `package-lock.json` is compromised or lost, `npm install` can be used to restore or resync
    - Running the linter, the test suite, or starting up the server are all harmless and "allowed"
    - Reading the `.env` or performing a force push to the branch are forbidden and outright "denied"
