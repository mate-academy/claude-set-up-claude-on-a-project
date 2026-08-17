# NOTES.md

In a short NOTES.md, answer in a few sentences each:

What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
Which permission rules did you add, and what could go wrong without your deny rule?

## Rules in CLAUDE.md

In the Commands section I listed the most common commands that are being executed by a developer
In the Architecture section I listed the major folders and their purpose as well as the entry point for the application.
In the Conventions I listed few of the best practices for the project like this. Where to store env variables, how the data access should be handled and how should route handlers handle the input and how should thet handle errors. I tried to keep the CLAUDE.md as minimalistic as possible at this stage.

## Persmission rules

I allowed Claude to use git status automatically and list all the folders. 
I want Claude to ask me before commiting anything to github
I deny any attempt for Claude to force push anything to git, delete recursively all files in the main folder or any subfoolder. And I don't want it to read any secrets that could be stored in .env files or under folders with name "secret".

After using the `/permissions` in Claude, I can see them loaded in the "context".
