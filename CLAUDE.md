# CLAUDE.md

Jednoduché Express API pro správu uživatelů, používané jako cvičný projekt pro kurz Claude Code.

## Project

Jednoduché Express API používané jako cvičný projekt pro kurz Claude Code. Nejde o produkční aplikaci.

## Commands

* `npm run dev` — spustí vývojový server na http://localhost:3000
* `npm test` — spustí všechny testy
* `npm run lint` — zkontroluje styl kódu pomocí ESLint

## Conventions

* Používej `db/store.js` pro přístup k datům, ne přímý přístup k datům v souborech v `routes/`.
* Používej JSON odpovědi ve formátu `{ error: "..." }` při chybách, ne vyhazování výjimek z rout.

## Architecture

* `server.js` — hlavní vstupní bod aplikace a místo, kde se spouští Express server.
* `routes/` — obsahuje jednotlivé routy, například `users.js` a `health.js`.
* `db/store.js` — jednoduchá paměťová vrstva pro práci s daty.