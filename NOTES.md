# NOTES

## CLAUDE.md: was drin ist und was bewusst fehlt

**Drin:**
- Eine Zeile Projektbeschreibung, damit Claude sofort weiß, worum es geht.
- **Commands:** `npm run dev`, `npm test`, `npm run lint`. Das sind die drei Befehle, die ich täglich brauche.
- **Conventions:** (1) nur CommonJS, weil ESLint auf `sourceType: "script"` steht und `import` im Lint fehlschlägt; (2) Fehler in Routen immer als `res.status(<code>).json({ error })` mit 400 bzw. 404. Beides sind Regeln, die man dem Code nicht auf den ersten Blick ansieht und gegen die Claude sonst leicht verstößt.
- **Architecture:** `server.js` als Entry Point (exportiert `app`, `listen` nur unter `require.main === module`), eine Router-Datei pro Ressource in `routes/`, Datenzugriff nur über `db/store.js`.

**Bewusst weggelassen:**
- `npm install`, `npm start` und die Einzeltest-Befehle: Claude kennt sie aus `package.json` bzw. findet sie selbst.
- Dateilisten, Details zu `.env`/`PORT` und Hinweise zum geteilten Test-Zustand: Das ist aus dem Code ablesbar oder ein Sonderfall, und jede zusätzliche Zeile verwässert die wichtigen.
- Keine Secrets, keine einmaligen Aufgaben.

## Permission-Regeln (`.claude/settings.json`)

- **allow:** `Bash(npm test:*)` und `Bash(npm run lint:*)`. Beide sind lesend bzw. prüfend und ändern nichts am Projekt, deshalb ohne Rückfrage.
- **ask:** `Bash(git push:*)`. Ein Push ist nach außen sichtbar, ich will ihn jedes Mal bewusst bestätigen.
- **deny:** `Read(./.env)` und `Bash(git push --force:*)`.

**Was ohne die deny-Regeln schiefgehen könnte:**

Ohne die Regel für .env könnte Claude Geheimnisse lesen, die dann z.B. auf GitHub landen oder im Cache bleiben. Git push --force darf auch nicht ausgeführt werden, um zu vermeiden, dass Commits anderer Personen auf GitHub überschrieben werden. Ich habe hier deny statt ask gewählt, weil man eine Rückfrage aus Gewohnheit oder versehentlich bestätigen könnte, bei deny aber gar nicht erst gefragt wird, und ein preisgegebenes Geheimnis oder ein überschriebener Remote-Stand lassen sich nicht sauber zurücknehmen.

## Verifikation

- [x] `/memory` zeigt die `CLAUDE.md` als geladen
- [x] `/permissions` zeigt die allow-, ask- und deny-Regeln
