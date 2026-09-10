## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

Firstly, Claude generated file with lots of useless information, so i removed points which duplicate info from pachage.json file (e.g. - versions of config) also tech stack. Also i removed a big description of how the project works an optimized it to a sentence. 
Secondly, i've added a structure how its described in the task (Commands, Conventions, Architecture).
So, i have successfully optimized CLAUDE.md file and now it is easy to be read and provided. All the changes are focused on optimization.

## Which permission rules did you add, and what could go wrong without your deny rule?

As this task is not big, there are not lots of denying rules. So, i have added only the rules which are highly important even in the begining of the project: 
"deny": ["Read(./.env)", "Bash(git push --force:*)"]
Its phorbidden to read env file, becaise obviously there are info which we have to keep in save. and also i've denied force pushing into git as it can leads us to the irreparable consequences