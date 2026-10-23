- What did you put in your `CLAUDE.md`, and what did you deliberately leave out, and why?

I had nothing to add to the file , I removed the detail at the top as we know already this is for a tutorial

i removed - `npm run lint` — ESLint (`eslint:recommended`)   as this is implementation specific

- Which permission rules did you add, and what could go wrong without your deny rule?

    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]

    The deny rule prevents claude from reading environment variables. This could lead to exposure of secrets , api keys etc if it did not exist.


I used /memory and could see the claude.md loaded.

I used /permissions and could see the permissions from the settings.json were active