---- Claude.md Notes ----

I included a one-line description of what the API does, without repeating the course context.

I included the three everyday commands: npm run dev, npm test, and npm run lint. Each command has a brief description of what it does.

I included concrete conventions covering CommonJS rather than ES modules, validating input before calling the store, converting route parameters to numbers, and handling environment variables safely.

I included a short architecture section explaining that server.js is the entry point, routes/ contains one router per resource, and db/store.js is the sole data-access layer.

I also included a brief note explaining that the tests import the app and use Supertest.

I deliberately left out the commands for running individual tests because they are occasional utilities rather than commands used routinely.

I left out the CI workflow details and Node version because Claude can inspect the workflow file when working on CI, and those details may change.

I shortened the explanation of require.main === module because saying that server.js only starts the server when run directly communicates the important rule without unnecessary implementation detail.

I left out details about the in-memory store because Claude can see them in db/store.js. The important architectural instruction is that routes must access data through the store.

I left out the warning about tests sharing state because it is implementation-specific and would be better documented alongside the tests if it causes a genuine problem.

I removed the introductory sentence about Claude Code because it is boilerplate and does not provide project-specific guidance.

I also excluded secrets, local environment values, and other sensitive information because CLAUDE.md is committed documentation.

The aim was to keep only information that affects how Claude should write, test, or organise the code, while removing anything it can easily discover by inspecting the repository.


---- Permissions Notes ----

I added 4 rules:

- Bash(npm test:*) allows Claude to run npm test and commands beginning with it without asking for permission. The :* suffix is equivalent to a trailing wildcard.

- Bash(git push:*) requires Claude to ask before running a matching git push command.

- Read(./.env) prevents Claude from reading or editing the project’s .env file. It also blocks recognised shell reads such as cat .env, although arbitrary Node or Python scripts could still access it unless sandboxing is enabled.

- Bash(git push --force:*) completely blocks matching force pushes. Deny rules are checked before ask and allow rules, so Claude cannot run the command even after requesting permission.

Without the .env deny rule, Claude could read credentials such as API keys, database passwords or access tokens. These might then appear in its context, terminal output, generated files or logs.

Without the force-push deny rule, the broader git push rule would still make Claude ask for approval. However, you could approve the command without noticing the --force flag. A force push can rewrite the remote branch’s history, remove other people’s commits and make recovery difficult.