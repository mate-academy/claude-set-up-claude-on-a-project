What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
> I put the following to prevent master push: Confirm pushing to master branch to prevent non pull request from happening on master.
> I left out because it's common knowledge.: - `npm test` — run all tests with the built-in Node test runner (`node --test`)

Which permission rules did you add, and what could go wrong without your deny rule?
> I added allow:BASH(npm tests:*); ask:Bash(git push:*); deny:READ(./.env) and Bash(git push --force:*)
> Without the READ(./.env), the claude can access keys and items that are meant to be kept secret.
> Without git push --force:*, claude could force a push to the branch.
