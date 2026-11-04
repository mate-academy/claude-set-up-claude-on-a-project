---
name: add-resource
description: Add a new REST API resource or endpoint to this Express project. Use when asked to create a new API resource, add routes, or implement a new REST endpoint with storage and tests.
---

# Add REST API Resource

Follow these steps in order:

1. Inspect existing routes, store functions, and project conventions in CLAUDE.md.
2. Add the required data operations to db/store.js.
3. Create or update the appropriate router in routes/.
4. Register any new router in server.js.
5. Follow the project's existing error handling and HTTP status conventions.
6. Add tests using node:test, node:assert, and supertest.
7. Run npm run lint and npm test.
8. Report the files changed, test results, and any remaining issues.

Do not add dependencies without asking first.
