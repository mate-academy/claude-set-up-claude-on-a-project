# NOTES.md

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
One line description of what the project is
I removed some preamble about what the claude.md document is. The filename should make it clear. 
Claude listed the 5 commands automatically
clarified import tyle 
ensured routes don't touch users directly 
kept /init's summary - it outlines the sections of the app to allow for testing and change within these particular silos


## Which permission rules did you add, and what could go wrong without your deny rule?
allow npm test - Simple enough
ask git push - Best to check before publishing anything 
deny git push force - prevents a force push overwriting the shared history on github and ruin other peoples commits
deny access to .env to protect sensitive information

Tested and verified - 
/memory lsited the project claude.md as loaded
/permissions showed the rules from the settings.json
asking to run tests resulred in all four tests passing. 
lint was also run and passed clean