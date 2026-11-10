# NOTES

## Qué incluí en `CLAUDE.md`

- **Descripción de una línea**: para que Claude sepa de entrada qué es el proyecto (API Express con store en memoria).
- **Comandos**: `npm run dev`, `npm test`, `npm run lint`, y cómo correr un solo archivo de test o filtrar por nombre. Son los que se usan en cada sesión. Agregué que CI usa Node 22 y corre lint y luego tests, porque mi Node local es v16 y `--test-name-pattern` no funciona ahí. Eso no se ve leyendo el código.
- **Convenciones**: reglas concretas que Claude puede seguir sin preguntar:
  - CommonJS, no ESM. El ESLint tiene `sourceType: "script"` y rompería con `import`.
  - Tests con `node:test` + `supertest`, sin agregar Jest u otro framework.
  - Las rutas acceden a datos solo a través de `db/store.js`.
  - Los errores siempre como `{ error: "..." }` con el status correcto.
  - No leer `.env`; usar `.env.example` para ver las claves.
- **Arquitectura**: solo lo que hay que leer varios archivos para entender:
  - El guard `require.main === module` en `server.js`, que permite a los tests importar `app` sin abrir un puerto.
  - Un router por recurso en `routes/`, montado en `server.js`.
  - El store en memoria comparte estado entre tests del mismo proceso, así que no hay que asumir cantidades exactas de usuarios.
  - Los params llegan como string y hay que convertirlos antes de buscar, porque el store compara con `===`.

## Qué dejé afuera y por qué

- **Listado de archivos y endpoints**: se descubre con `ls` o leyendo `routes/`, y se desactualiza rápido.
- **Prácticas genéricas** ("escribir buen código", "agregar tests"): no le dicen nada nuevo a Claude y gastan contexto.
- **Instrucciones de instalación y del curso** (clonar, abrir terminal, cómo entregar): están en el README, son para personas y no para el trabajo diario de Claude.
- **Secretos y valores de configuración**: nada de `.env` ni credenciales; el archivo se commitea.
- **Tareas puntuales** (como "crear settings.json"): son de una sola vez y no sirven en sesiones futuras.

Criterio general: cada línea tiene que evitar un error o una pregunta que Claude haría sin ella. Si se deduce leyendo un solo archivo, no va.
