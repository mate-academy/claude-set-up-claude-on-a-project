Was ich reingetan habe:
- CLAUDE.md: kurze, präzise Anleitung mit einem Einzeiler, drei Commands, klaren Conventions und einer Architekturübersicht, damit Claude beim Start schnell nutzbare Hinweise hat.
- .claude/settings.json: erlauben, Tests lokal auszuführen (wichtig für schnelle feedback loops), git push fragt vor dem Ausführen, und sensitive Dateien (.env) werden verboten.


Was ich weggelassen habe:
- Keine langen Design-Docs oder Passwörter/Secrets. Keine One-off Aufgaben oder lokale dev-notes, damit CLAUDE.md allgemein brauchbar bleibt.


Warum die Deny-Regel:
- Read(./.env) verhindert, dass Claude oder ein automatisches Skript versehentlich geheime Werte liest. Ohne diese Regel könnte ein Assistant insb. bei Forks sensible Konfigurationen offenlegen.
- Bash(git push --force:*) wird verhindert, um unabsichtliche Zerstörung der entfernten Branch-History zu vermeiden.


Verifiziert:
- Lade CLAUDE.md via /init oder starte eine neue Session und prüfe mit `/memory`, dass CLAUDE.md geladen ist, und `/permissions`, dass die Regeln aus .claude/settings.json aktiv sind.
