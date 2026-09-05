# NOTES

## Ce que j'ai mis dans le CLAUDE.md, et ce que j'ai volontairement laissé de côté

**Ce que j'ai mis :** une phrase sur le rôle de l'application (petite API REST Express, liste d'utilisateurs en mémoire), les commandes utiles (`npm run dev`, `npm test`, test d'un seul fichier, lint) et le rappel que la CI doit rester au vert, les conventions non devinables depuis le code (CommonJS imposé par `.eslintrc.json`, guillemets doubles et points-virgules, un router par ressource enregistré dans `server.js`, les handlers passent toujours par `db/store.js`, format d'erreur `res.status(code).json({ error })` suivi d'un `return`), et l'architecture (pourquoi `server.js` sépare `app` de `app.listen`, le store en mémoire réinitialisé à chaque démarrage).

**Ce que j'ai laissé de côté :** la liste des dépendances et leurs versions (déjà dans `package.json` / `package-lock.json`), la structure détaillée fichier par fichier (lisible directement), l'historique des changements (dans git), et des généralités sur Express ou le style JavaScript que Claude connaît déjà. Le but est de ne garder que ce qui est spécifique au projet et coûteux à redécouvrir à chaque session ; tout ce qui est déjà écrit ailleurs dans le dépôt n'a pas à être recopié.

## Règles de permission ajoutées

- `allow` : `Bash(npm test:*)` — commande fréquente, sans effet de bord, pour éviter une demande de confirmation à chaque exécution des tests.
- `ask` : `Bash(git push:*)` — action sortante et difficile à annuler ; on demande toujours confirmation avant de publier quoi que ce soit.
- `deny` : `Read(./.env)` — interdit la lecture du fichier d'environnement (le vrai `.env`, pas `.env.example`).

**Ce qui pourrait mal tourner sans la règle `deny` :** sans elle, Claude pourrait ouvrir `.env` pendant une exploration du dépôt et faire apparaître des secrets (clés d'API, identifiants de base de données, tokens) dans la conversation. Une fois affichés, ces secrets peuvent se retrouver dans l'historique de session, dans un résumé de contexte, ou être involontairement recopiés dans un commit, un message ou un appel à un service externe. La règle `deny` coupe ce risque à la source, quelle que soit la commande ou l'outil utilisé.
