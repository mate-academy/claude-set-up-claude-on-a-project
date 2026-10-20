### What is in `CLAUDE.md`
I left the main used commands npm install, npm test, npm run lint, I decided to remove commands for running specific test files.
I left in the architecture section the server entry point /routes and db/store description.
Conventions has commonJS only, structure of error and config should never read or commit .env, I removed adding comments to describe what method does.

### Permissions
 I allowed Bash (npm test), deny  Read ( ./.env) and Bash (git push --force) and ask Bash(git push)
 if I didn't deny read .env file that means that sensitive information can be exposed and be used in incorrect ways, git push using force can bring problems that we could not identify in case an error occurs when trying to to a git push with a change that could potentially break the project and we didn't realize that was pushed by force.