# NOTES

## ¿Qué puse en el CLAUDE.md y qué dejé fuera?

Incluí solo lo que Claude haría mal si no se lo digo: los tres comandos (y que los tests usan `node --test`, no Jest), las convenciones que no son obvias (CommonJS en vez de `import`, tests con `supertest` sin levantar un puerto, errores como `{ error: "..." }`, acceso a datos solo vía `db/store.js`, no tocar el código de la app) y un resumen corto de la arquitectura.

Dejé fuera la lista de archivos y endpoints (Claude la descubre leyendo el código), consejos genéricos tipo "escribe código limpio", cualquier secreto y las tareas puntuales del curso. Lo escribí en español porque es el idioma en que trabajo.

## ¿Qué reglas de permisos agregué?

- **allow:** `npm test`, `npm run lint` y `npm run dev`. Son seguros y los uso todo el tiempo, así Claude puede verificar su trabajo sin pedirme permiso cada vez.
- **ask:** `git push`. Subir cambios afecta al repo compartido, así que quiero confirmarlo siempre.
- **deny:** leer `.env` y hacer `git push --force` / `git push -f`.

Sin la regla de `.env`, Claude podría leer contraseñas o claves reales y terminar mostrándolas en la conversación o copiándolas a otro archivo. Sin la de force-push, un error podría borrar el historial del repo remoto. No bloqueé `.env.example` porque solo tiene valores de ejemplo y a Claude le sirve para saber qué configuración existe.

## Otro cambio

Arreglé el `.gitignore`: sus líneas empezaban con espacios y git no las reconocía, así que `.env` y `.claude/settings.local.json` **no** estaban realmente ignorados. Lo comprobé con `git check-ignore` antes y después.

## Verificación

- `/memory` muestra el `CLAUDE.md` cargado: _(pendiente de confirmar en una sesión nueva)_
- `/permissions` muestra las reglas allow / ask / deny: _(pendiente de confirmar en una sesión nueva)_
