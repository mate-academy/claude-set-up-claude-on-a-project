# Notes

## Claude Code permission rules (.claude/settings.local.json)

- **allow**
  - `Bash(curl -s http://localhost:3000/health)`
  - `Bash(curl -s http://localhost:3000/users)`
  - `Bash(npm test:*)`
  - `Bash(npm run lint:*)`
- **ask**
  - `Bash(git push:*)`
- **deny**
  - `Read(./.env)`
  - `Bash(git push --force:*)`
