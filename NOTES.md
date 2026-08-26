\# Notes



\## CLAUDE.md



I kept the project description, the commands I use regularly, concrete coding conventions, and the main architecture. I deliberately left out obvious details that Claude can learn from the code, one-off tasks, and sensitive information because they would make the project memory noisy or unsafe.



\## Permission rules



I allowed the test command because it is a safe and frequent operation. I added a deny rule for `.env` so secrets are not exposed, and a deny rule for force-push because it can overwrite remote history. I also made normal `git push` require confirmation so publishing changes is explicit.



\## Verification



The intended verification is to start a fresh Claude Code session, use `/memory` to confirm `CLAUDE.md` is loaded, and use `/permissions` to confirm the allow, ask, and deny rules.

