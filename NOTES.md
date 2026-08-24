I left out this "This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository." as redundunt sentence
I added this 2 rules: 
    "allow": ["Bash(npm test:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
took them from example

my deny rule prevent agent from reding secrets and pushing 
