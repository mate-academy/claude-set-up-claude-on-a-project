# Claude Code Setup Notes

## Project Overview
This project is a Node.js Express API used for Claude Code training.

## CLAUDE.md
I created a project-level CLAUDE.md file to provide Claude with clear instructions about the project, available commands, and working rules.

## Permission Settings
I configured permissions in .claude/settings.json:

- **Allow:** Running tests and lint checks.
- **Ask:** Installing dependencies and starting the application.
- **Deny:** Reading sensitive environment files and running a dangerous recursive deletion command.

## Safety and Workflow
Claude should review existing files, explain proposed changes, and request approval before modifying application code.

## Goal
Make Claude Code useful and safe when working on this project without changing the existing application code.

## What I Deliberately Left Out of CLAUDE.md

I deliberately excluded personal language preferences, temporary instructions, credentials, access tokens, and unrelated project details from the shared CLAUDE.md file.

Personal preferences belong in user-level instructions, not in shared project instructions. Temporary information can become outdated, while secrets must never be stored in a shared repository.

## Security Risks Without Deny Rules

Without deny rules protecting `.env` files, Claude Code could accidentally read or expose database passwords, API keys, access tokens, and other sensitive configuration values.

These secrets could appear in tool outputs, logs, or generated content, creating a risk of unauthorized access or credential leakage. Deny rules help reduce this risk, alongside proper secret management and Git ignore rules.
  
