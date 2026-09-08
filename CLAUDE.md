# Express API for User Management

Express.js REST API providing user management endpoints with in-memory storage.

## Commands
- `npm run dev` - Start development server with auto-reload (http://localhost:3000)
- `npm test` - Run test suite with Node's built-in test runner (`node --test`)
- `npm run lint` - Run ESLint code style checks

## Architecture
- `server.js` - Application entry point and server startup
- `routes/` - API route definitions (one file per resource: users.js, health.js)
- `db/store.js` - In-memory data store helper

## Conventions
- Use CommonJS syntax (`require`/`module.exports`), not ES module `import`/`export`
- Format error responses as `{ error: "message" }` with appropriate status codes
