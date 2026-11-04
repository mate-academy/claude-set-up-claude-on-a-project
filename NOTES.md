The test does not need to be approved by the developer "allow": ["Bash(npm test:*)"]
never upload secret data deny .env "deny": ["Read(./.env)", "Bash(git push --force:*)"]
ask me when you upload code changes "ask": ["Bash(git push:*)"]
