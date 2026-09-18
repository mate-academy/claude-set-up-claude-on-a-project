# NOTES.md

## CLAUDE.md

Le fichier contient une description en une ligne du projet, les commandes courantes (`npm run dev`, `npm test`, `npm run lint`), une note d'architecture (point d'entrée `server.js`, un fichier de route par ressource, accès aux données centralisé dans `db/store.js`) et une section Conventions avec des règles de travail (petits incréments, validation avant modification, exécution directe des modifications, vérification après chaque étape, préservation du comportement existant).

Laissé de côté volontairement : le détail du code déjà lisible dans les fichiers (ex. structure exacte des routes), les notes ponctuelles liées à cette session, et toute information sensible (aucun secret, aucune valeur d'environnement). L'objectif était de garder un fichier court, qui apporte une information que le code seul ne donne pas.

## Règles de permission (.claude/settings.json)

- **allow** : `Bash(npm test:*)` — les tests peuvent s'exécuter sans confirmation à chaque fois.
- **ask** : `Bash(git push:*)` — une confirmation est demandée avant tout push.
- **deny** : `Read(./.env)` et `Bash(git push --force:*)`.

Sans ces règles deny, Claude pourrait lire le contenu de `.env` (et donc exposer des secrets dans une réponse ou un log) ou exécuter un `git push --force` qui écraserait l'historique distant et ferait perdre des commits déjà poussés par quelqu'un d'autre.

## Vérification

- `/memory` confirme que `CLAUDE.md` est bien chargé.
- `/permissions` confirme que les règles allow / ask / deny sont bien prises en compte.
