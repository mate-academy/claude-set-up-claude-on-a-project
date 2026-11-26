What did you put in your `CLAUDE.md`, and what did you deliberately leave out, and why?

I removed all explanatory content from CLAUDE.md. I also removed everything, that was self-explanatory, like instructions how to run a single test file instead of all of them. The reason is that, we shouldn't give Claude information it can find in the files itself, and we shouldn't explain business logic in a file that should contain only strict rules and instructions.

Now CLAUDE.md contains only the command list, strict conventions and architecture notes. This way, Claude gets clear instructions and doesn't waste extra tokens and time for unnecessary information.

Which permission rules did you add, and what could go wrong without your deny rule?

I allowed Claude to run tests, so it can check and test things without asking for permission. I set Claude to ask before running git push, so I can control releases manually. I don't allow Claude to read the .env file, so he can't access any credentials, also I forbade Claude to use force push, so we can handle merge and push failures to avoid problems after release.