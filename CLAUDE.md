# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express API для users з health-check ендпоінтом.

## Commands

```bash
npm run dev    # запуск з auto-reload, http://localhost:3000
npm test       # запустити тести
npm run lint   # перевірити стиль коду
```

## Conventions

- Один файл роуту на ресурс у `routes/`, не спільний router для всіх ресурсів.
- Доступ до даних лише через функції `db/store.js` (`getAllUsers`, `getUserById`, `createUser`), не напряму до масиву `users`.

## Architecture

`server.js` — точка входу, монтує роути з `routes/` і стартує сервер. Кожен ресурс (`users`, `health`) має свій файл роуту. Доступ до даних ізольований у `db/store.js` (in-memory, без персистенції).
