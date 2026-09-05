# Express API Project
A simple Express.js REST API with users and health endpoints.
## Commands
- `npm run dev` - Start the development server
- `npm test` - Run tests
- `npm run lint` - Check code style


## Conventions
- Use one route file per resource in `routes/`, not multiple resources in one file
- Use `db/store.js` for data access, not direct database queries


## Architecture
- `server.js` is the entry point
- Routes in `routes/` directory
- In-memory data store in `db/store.js`
