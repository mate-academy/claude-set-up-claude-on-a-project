# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Ce que fait l'application :** une petite API REST Express qui gère une liste d'utilisateurs en mémoire, avec des endpoints pour lister les utilisateurs, en récupérer un par son id, en créer un, et vérifier l'état du service.

API utilisée comme projet fil rouge du cours Claude Code. Elle expose `/users` (liste, lecture par id, création) et `/health`.

## Commandes

- `npm run dev` — démarre l'API sur http://localhost:3000 avec rechargement automatique (`node --watch`)
- `npm test` — lance tous les tests avec le runner intégré de Node (`node --test`)
- `node --test tests/users.test.js` — lance un seul fichier de test
- `node --test --test-name-pattern="returns 404"` — lance les tests dont le nom correspond au motif
- `npm run lint` — ESLint sur tout le dépôt

La CI (`.github/workflows/ci.yml`) exécute `npm run lint` puis `npm test` à chaque push et PR ; garder les deux au vert.

## Conventions

- CommonJS uniquement (`require` / `module.exports`), pas de modules ES — `.eslintrc.json` fixe `sourceType: "script"`.
- Guillemets doubles et points-virgules, comme dans les fichiers existants.
- Un fichier de route par ressource dans `routes/`, chacun exportant un `express.Router()`. L'enregistrer dans `server.js` avec `app.use("/<ressource>", ...)`.
- Les handlers de route ne touchent jamais aux données directement — toutes les lectures et écritures passent par `db/store.js`.
- Renvoyer les erreurs sous la forme `res.status(<code>).json({ error: "<message>" })` et faire un `return` du handler sur ce chemin.

## Architecture

- `server.js` — point d'entrée. Construit l'`app`, monte les routers, et n'appelle `app.listen` que lorsqu'il est exécuté directement (`require.main === module`) pour que les tests puissent faire `require("../server")` sans ouvrir de port. Exporte `app`.
- `routes/` — couche HTTP. `users.js` valide les entrées et traduit les résultats du store en codes de statut ; `health.js` est un simple contrôle de disponibilité.
- `db/store.js` — store de données en mémoire qui remplace une vraie base. Tableau `users` et compteur `nextId` au niveau du module ; l'état est réinitialisé à chaque redémarrage, donc les tests ne doivent rien supposer au-delà des deux utilisateurs initiaux.
