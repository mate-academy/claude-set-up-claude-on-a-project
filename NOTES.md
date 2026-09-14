# NOTES.md

## Entorno de trabajo

Se decidió trabajar en VS Code (con la extensión de Claude Code integrada) por
practicidad: permite editar el código, ver el diff y correr Claude Code desde
la misma ventana.

## CLAUDE.md

Se generó con `/init`, dejando que Claude leyera el código del proyecto
(`server.js`, `routes/`, `db/store.js`, `tests/`, `README.md`) y propusiera un
primer borrador. Después se revisó que mantuviera la estructura pedida:
**Description**, **Commands**, **Architecture** y **Conventions**. Se dejó
fuera cualquier detalle obvio ya visible en el propio código (como el listado
completo de archivos), notas puntuales de esta tarea y cualquier dato
sensible — solo quedó lo que realmente ahorra tiempo en una sesión nueva.

## .claude/settings.json

Se le pidió explícitamente a Claude que generara la configuración de permisos
pensada para este proyecto en particular (no una plantilla genérica), y
después se revisaron las reglas propuestas antes de darlas por buenas:

- **allow**: los scripts npm de uso diario (`test`, `lint`, `dev`) y comandos
  de git de solo lectura (`status`, `diff`, `log`).
- **ask**: `git push` y `git commit`, para confirmar cada uno antes de que se
  ejecute.
- **deny**: lectura de `.env` y comandos destructivos (`git push --force`,
  `rm -rf`).

Sin la regla `deny` sobre `.env`, Claude podría leer y exponer variables de
entorno sensibles en sus respuestas (en este starter no hay secretos reales,
pero en un proyecto real sí los habría). Sin bloquear `git push --force` o
`rm -rf`, un comando mal interpretado podría sobrescribir el historial remoto
o borrar archivos del proyecto de forma irreversible.
