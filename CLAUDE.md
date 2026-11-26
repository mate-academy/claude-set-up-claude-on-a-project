## CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (Node 22, CommonJS) REST API for users, with an in-memory store. It is the course starter project, so later course levels build on it.

## Commands

*   `npm run dev`: start the API with `node --watch` on `http://localhost:3000`
*   `npm test`: run every test with the built-in `node:test` runner
*   `npm run lint`: run ESLint

## Conventions

*   Write tests with `node:test` and `node:assert`, plus `supertest` against the exported `app`. Do not add Jest or Mocha.
*   Keep secrets in `.env`, which is git-ignored. Add new config keys to `.env.example`.

## Architecture

*   `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. 
*   `routes/<resource>.js` holds one `express.Router` per resource. 
*   `db/store.js` is the only data-access layer.