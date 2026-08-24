### What was included in CLAUDE.md vs. left out, and why?
The file includes project scope, daily commands, core conventions, and system architecture. Temporary runtime details were omitted to save context space, as Claude can infer them directly from code.

### What permission rules were added, and what could go wrong without the deny rule?
Configured `allow` for testing, `ask` for standard pushes, and `deny` for environment variables and forced pushes. Without `deny` rules, sensitive credentials in `.env` could leak or Git history could be overwritten by automated commands.