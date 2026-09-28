# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

API REST pequeña en Express (usuarios + health check) que sirve de proyecto base para el curso de Claude Code.

## Comandos

- `npm run dev` — arranca la API en http://localhost:3000 y se reinicia sola al guardar cambios (`node --watch`).
- `npm test` — corre los tests con el runner nativo de Node (`node --test`), no Jest.
- `npm run lint` — ESLint. CI (Node 22) corre `lint` y después `test`; ambos deben pasar.

## Convenciones

- Usar CommonJS (`require` / `module.exports`), no `import`/`export`: ESLint está configurado con `sourceType: "script"`.
- Los tests usan `node:test` + `node:assert` + `supertest` sobre el `app` exportado; nunca levantar un puerto real en los tests.
- Los errores se responden como JSON con la forma `{ error: "mensaje" }` y el status adecuado (400, 404…).
- Las rutas nunca guardan datos por su cuenta: todo acceso a datos pasa por las funciones de `db/store.js`.
- No modificar el código de la app salvo que se pida explícitamente: el objetivo del proyecto es configurar Claude Code, no cambiar la API.

## Arquitectura

- `server.js` crea y exporta `app`; solo llama a `listen` si se ejecuta directamente (`require.main === module`), para que los tests puedan importarlo.
- Un archivo por recurso en `routes/` (un `express.Router`), montado en `server.js` con `app.use("/<recurso>", ...)`.
- `db/store.js` es un almacén en memoria: los datos se reinician cada vez que arranca el servidor.
- La configuración va en `.env` (ver `.env.example`); `.env` nunca se sube al repo.
