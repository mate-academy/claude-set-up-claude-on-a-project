Changes in Claude.md:

I deleted the line stating the purpose of the project, it seemed TMI.
Also deleted how to run a one-off test, I thought the mention of npm test is concise enough for now. To architecture, I added that there is on route file per resource in the /routes folder. Automatically added by claude was the entry about 'db/store.js' and the one
about 'tests/'

permissions:

I added npm test to allow and git push to ask. To deny, I added reading .env, as I do not
want Claude (or anyone) to read my passkeys or other secrets. Also denied force push to 
git so that changes to the repo cannot get pushed uncontrolled.
