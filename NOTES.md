# Course Notes: Claude Code Setup

## CLAUDE.md Design Choices
- **Included:** A one-line project description, fundamental scripts (`npm run dev`, `npm test`, `npm run lint`), core architecture structure (`server.js`, `routes/`, `db/store.js`), and strict development conventions (CommonJS usage, zero lint errors requirement).
- **Excluded:** Standard Express.js usage guides, installation steps (`npm install`), sensitive secrets, and temporary session task notes.
- **Reasoning:** Keeping `CLAUDE.md` minimal and specific avoids cluttering the model's context window with obvious details, ensuring higher accuracy and lower latency.

## Permission Rules & Security
- **Added Rules:**
  - `allow`: Automated tasks like `npm test:*` and `npm run lint:*` for frictionless execution.
  - `ask`: Guardrail for remote branch pushes (`git push:*`) requiring manual confirmation.
  - `deny`: Strict blocks on sensitive environment files (`Read(./.env)`) and destructive actions (`git push --force:*`).
- **Risks without `deny`:** Without an explicit `deny` rule for `.env`, AI sessions could expose private keys, Database tokens, or environmental credentials into the conversation log. Without a force-push block, automated agents could accidentally overwrite or destroy shared git histories.

## Verification Checklist
- Ran `/memory` to confirm `CLAUDE.md` is active in the context memory.
- Ran `/permissions` to ensure `allow`, `ask`, and `deny` rules are applied.
