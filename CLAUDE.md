# CLAUDE.md

Tento soubor poskytuje pokyny pro Claude Code při práci s tímto repozitářem.

## Project

Jednoduché Express API používané jako cvičný projekt pro kurz Claude Code. Nejde o produkční aplikaci.

## Commands

* `npm run dev` — spustí vývojový server na http://localhost:3000
* `npm test` — spustí všechny testy
* `npm run lint` — zkontroluje styl kódu pomocí ESLint

## Conventions

* Přístup k datům vždy probíhá přes `db/store.js`, nikdy přímo v souborech v `routes/`.
* Routy ověřují vstupy a při chybě vracejí JSON ve formátu `{ error: "..." }` se správným HTTP stavovým kódem.

## Architecture

* `server.js` — hlavní vstupní bod aplikace a místo, kde se spouští Express server.
* `routes/` — obsahuje jednotlivé routy, například `users.js` a `health.js`.
* `db/store.js` — jednoduchá paměťová vrstva pro práci s daty.
