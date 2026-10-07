# Notes

## CLAUDE.md

I kept only project-specific information that Claude needs regularly: the main commands, coding conventions, and the project architecture. I left out obvious information, one-off instructions, and sensitive details because they do not provide lasting value and would make the file noisier.

## Permissions

I allowed the test and lint commands because they are safe commands that are used frequently. I added a deny rule for reading `.env` to protect secrets and a deny rule for force-pushing because it could overwrite remote history. I also configured `git push` to require confirmation.

I verified that `/memory` shows the `CLAUDE.md` as loaded and `/permissions` shows the configured rules.
