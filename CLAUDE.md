# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A minimal Express REST API starter for the Claude Code course, providing user CRUD operations via HTTP routes backed by an in-memory data store.

## Commands

- `npm run dev` — Start the API with auto-restarts on changes (http://localhost:3000)
- `npm run test` — Run test suit
- `npm run lint` — run ESLint
- `npm start` — Start the API in production mode (no watch)

## Conventions

- Use CommonJS (**`require/module.exports`**), not ESM **`import`/export**.
- Access data through **`db/store.js`**, not by manipulating arrays directly in route files.

## Architecture

- **`server.js`** — Entry point; creates Express app, mounts routes, exports app for tests
- **`routes/`** — One file per resource (e.g., `users.js`, `health.js`); each exports an Express Router
- All data access goes through **`db/store.js`** 
