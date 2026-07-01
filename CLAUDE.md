# Coding Rules for Express API Starter Project

## Commands

Run these commands in the project root:

```bash
npm run dev     # Start development server with watch mode on http://localhost:3000
npm start       # Start production server (without watch)
npm test        # Run all tests using node --test
npm run lint    # Check code style with ESLint
node server.js  # Run the server application directly

## Conventions

**Naming**: Use `snake_case` for variable and function names (e.g., `first_number`, not `firstNumber`).

**Exports**: Always use named exports (`module.exports = {...}`), never default exports.

**Route Organization**: Each route/resource has its own file in the `routes/` directory with a single router export.

## Architecture

- **Entry Point**: [`server.js`](./server.js) creates and mounts an Express application, serving JSON responses on port 3000 (or `$PORT`).
- **Route Files**: Each endpoint group lives in its own file (`routes/users.js`, `routes/health.js`) exported as a named router. The server applies each middleware using `.use()`; these routers are not ordered by route path but registered sequentially—first mounted wins for shared prefixes like `/users`. For specific parameters (e.g., IDs), routes without a prefix share the common handler first, then use parameter matching to narrow down execution order within that single file.
- **Data Access**: The `db/store.js` module provides an in-memory data layer with CRUD operations. All data reads and writes go through this store—do not bypass it for direct state mutations or persisting outside its methods.
