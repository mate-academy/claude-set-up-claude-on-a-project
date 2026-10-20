## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

- put "Config comes from env vars (see .env.example). Real values go in .env, which must never be read or committed."
- remove "This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository."

## Which permission rules did you add, and what could go wrong without your deny rule?

- deny "Read(./.env)" without it claude can read env sensitive data