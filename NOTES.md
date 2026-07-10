# Notes

I kept the CLAUDE.md short and focused on the commands, conventions, and architecture that Claude needs to work safely in this repository. I excluded information that is already obvious from the code, temporary tasks, and sensitive configuration.

I allowed the test and lint commands because they are safe and frequently used. I configured git push to require confirmation and denied access to the `.env` file and force-push commands. Without these deny rules, sensitive values could be exposed or repository history could be overwritten.

I verified that `/memory` loads the CLAUDE.md and that `/permissions` shows the configured rules.
