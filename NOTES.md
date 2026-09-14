# NOTES.md

## CLAUDE.md

J'ai gardé quatre sections courtes : description, commandes, conventions, architecture.

Gardé :
- Les trois commandes réellement utilisées au quotidien (`dev`, `test`, `lint`).
- Deux conventions non évidentes à la simple lecture d'un fichier isolé : la séparation route/store, et CommonJS plutôt qu'ESM (pour éviter que Claude introduise du `import`/`export`).
- Une architecture en 3 lignes, juste assez pour situer où ajouter une route ou une donnée.

Volontairement écarté :
- Tout ce qui est déjà lisible dans le code lui-même (ex. le détail des routes `/users`, les codes de retour) — ça se voit en ouvrant `routes/users.js`.
- Les notes ponctuelles (ex. "le store reset au redémarrage" est déjà commenté dans `db/store.js`).
- Toute donnée sensible : aucun secret, aucune URL de prod, rien lié à `.env`.

## Permissions (.claude/settings.json)

- `allow` : `npm test` et `npm run lint` — commandes sûres, lancées en boucle, pas besoin de confirmation à chaque fois.
- `ask` : `git push` — je veux valider chaque push moi-même plutôt que laisser Claude pousser automatiquement.
- `deny` : lecture de `.env` (secrets potentiels), `git push --force` (peut écraser l'historique distant) et `rm -rf` (suppression destructive).

Sans la règle `deny`, un agent qui exécute des commandes sans supervision pourrait lire des secrets locaux (`.env`), écraser l'historique d'une branche partagée avec un `push --force`, ou supprimer des fichiers de façon irréversible avec `rm -rf`. Ces trois cas sont peu probables en usage normal, mais coûteux s'ils arrivent — d'où le blocage systématique plutôt qu'une simple confirmation.

## Vérification

- `/memory` confirme que `CLAUDE.md` est chargé.
- `/permissions` confirme les règles allow/ask/deny ci-dessus.
- `npm test` (4/4) et `npm run lint` passent sans erreur.
