# claude-course-starter

API Express minimaliste servant de bac à sable pour le cours Claude Code (endpoints `/users` et `/health`, données en mémoire).

## Commandes

- `npm run dev` — démarre l'API en local avec rechargement auto (http://localhost:3000)
- `npm test` — lance les tests (`node --test`)
- `npm run lint` — vérifie le style avec ESLint

## Conventions

- Une route par ressource dans `routes/` (`users.js`, `health.js`), jamais de logique métier dans `server.js`
- Tout accès aux données passe par `db/store.js`, jamais de manipulation directe du tableau `users` ailleurs
- CommonJS (`require`/`module.exports`), pas d'ESM

## Architecture

- `server.js` — point d'entrée, monte les routes et démarre le serveur (sauf en test, où `app` est exporté sans écouter de port)
- `routes/` — un fichier par ressource
- `db/store.js` — store en mémoire (non persistant, réinitialisé à chaque redémarrage), tient lieu de base de données
