# Express API Project
Simple REST API with user management.
## Commands
- 
pm run dev — запустити сервер
- 
pm test — запустити тести
- 
pm run lint — перевірити стиль коду


## Conventions
- ES modules (import/export), не CommonJS
- async/await для асинхронних операцій


## Architecture
- server.js — точка входу
- outes/ — один файл на ресурс
- db/store.js — робота з даними
