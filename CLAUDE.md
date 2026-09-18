# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express-REST-API mit In-Memory-Datenspeicher, das Starterprojekt für den Claude-Code-Kurs.

## Commands

```
npm run dev        # Server mit Auto-Reload auf http://localhost:3000
npm test           # node --test
npm run lint       # eslint .
```

## Conventions

- Nur CommonJS (`require` / `module.exports`), kein ESM (`import`/`export`): ESLint ist auf `sourceType: "script"` gestellt, `import` schlägt im Lint fehl.
- Fehler in Routen immer als `res.status(<code>).json({ error: "<message>" })` zurückgeben (400 bei ungültiger Eingabe, 404 bei fehlender Ressource), nie als Text oder HTML.

## Architecture

- `server.js` ist der Entry Point: erstellt die Express-`app`, bindet die Router ein und exportiert `app`. `listen` läuft nur unter `require.main === module`, damit Tests die App ohne offenen Port importieren können.
- `routes/` enthält pro Ressource eine Router-Datei (`users.js`, `health.js`). Neue Router werden in `server.js` registriert.
- Der Datenzugriff läuft ausschließlich über `db/store.js` (In-Memory, nicht persistent). Routen greifen nie direkt auf die Daten zu.
