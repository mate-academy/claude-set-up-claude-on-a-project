# NOTES

## CLAUDE.md: qué incluí

- **Descripción de una línea**: qué es el proyecto (API Express de usuarios con store en memoria), para que Claude tenga contexto inmediato.
- **Comandos**: `npm run dev`, `npm test` y `npm run lint`, más cómo ejecutar un solo archivo de test y filtrar por nombre (`node --test --test-name-pattern`). Ahorra tener que leer `package.json` en cada sesión. También indiqué que CI ejecuta lint y tests, para que ambos se den por obligatorios.
- **Convenciones**: reglas concretas del tipo "usa X, no Y" que no se deducen de un solo archivo: CommonJS en vez de ES modules, `node:test` + `supertest` en vez de Jest, acceso a datos solo vía `db/store.js`, formato de error `{ error }` con su status y no renombrar `req`/`res`/`next` por el linter.
- **Arquitectura**: el patrón `require.main === module` que permite a los tests importar `app` sin abrir puerto, la regla de un router por recurso (y los dos pasos para añadir uno), y dos trampas del store: el estado se comparte entre tests del mismo proceso y los ids son números (hay que convertirlos con `Number()`).

## CLAUDE.md: qué dejé fuera y por qué

- **Listado de archivos y carpetas**: Claude lo descubre con `ls` o leyendo el código; repetirlo solo ocupa contexto y se desactualiza.
- **Instrucciones del curso** (entregables, cómo abrir una terminal, cómo hacer el PR): son tareas puntuales, no guías permanentes para trabajar en el código.
- **Buenas prácticas genéricas** ("escribe tests", "maneja errores"): Claude ya las sigue, así que no aportan nada.
- **Secretos o valores de `.env`**: CLAUDE.md se commitea y se comparte; nunca debe contener información sensible.

## Permisos (`.claude/settings.json`)

- **allow**: `npm test`, `npm run lint` y `node --test`. Son seguros (solo leen y verifican) y se usan constantemente, así que evitan pedir confirmación cada vez.
- **ask**: `git push`. Publica cambios en el remoto, así que quiero confirmarlo siempre.
- **deny**: leer `./.env` y `./.env.local`, y `git push --force` / `git push -f`.
  - Sin el deny de `.env`, Claude podría leer secretos reales y acabar mostrándolos en la conversación o copiándolos en código o commits.
  - Sin el deny de force-push, un push forzado podría sobrescribir el historial remoto y borrar trabajo de otros sin posibilidad de recuperarlo.
  - No usé `.env.*` porque bloquearía también `.env.example`, que es una plantilla sin secretos y útil para entender la configuración (un deny no admite excepciones vía allow).
  - Limitación conocida: `Read(./.env)` bloquea la herramienta Read, pero no un `cat .env` por Bash; para cerrarlo del todo haría falta una regla Bash adicional o el sandbox.

## Verificación

- `/memory`: en una sesión nueva, CLAUDE.md aparece como cargado.
- `/permissions`: muestra las reglas allow / ask / deny anteriores.
