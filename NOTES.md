# NOTES

## CLAUDE.md

**O que coloquei.** Quatro blocos enxutos: uma linha dizendo o que o projeto é (API Express de treino, dados em memória); os comandos que uso de verdade (`dev`, `start`, `test`, `lint`) mais como rodar um único teste e filtrar por nome; a arquitetura que só se entende lendo vários arquivos (o `server.js` só faz `app.listen` quando rodado direto, para os testes importarem o `app` via supertest; um router por recurso em `routes/`; todo acesso a dados via `db/store.js`); e as convenções não óbvias (CommonJS e não ESM, aspas duplas com ponto e vírgula, e a regra do ESLint que ignora `req`/`res`/`next`/`_`).

**O que deixei de fora, e por quê.** Cortei a lista de arquivos e o que cada rota retorna — isso se descobre em segundos lendo o código, então não ganha lugar no arquivo. Também deixei de fora o passo a passo do curso que está no README (é instrução para mim, o aluno, não para o Claude operar no repo) e qualquer coisa sensível. A ideia foi: cada linha precisa poupar tempo numa sessão real; o que for óbvio ou descobrível some.

## Permissões (.claude/settings.json)

**allow** — `npm test`, `npm run lint`, `npm run dev`: são o loop do dia a dia, seguros e repetitivos; liberá-los evita um prompt de confirmação a cada execução.

**ask** — `git push`: quero rodar, mas revisando cada vez antes de publicar na branch.

**deny** — `Read(./.env)` e `git push --force` (incluindo `--force-with-lease`).

**O que poderia dar errado sem o deny.** Sem `Read(./.env)`, o Claude poderia abrir um `.env` real (quando existir) e expor segredos no contexto ou numa resposta — o `.env` é git-ignored justamente para nunca vazar. Sem bloquear o `git push --force`, um push forçado poderia reescrever o histórico remoto e apagar o trabalho de outra pessoa na branch, algo difícil de reverter. As duas regras transformam ações de alto risco e baixo uso em coisas que simplesmente não acontecem por acidente.

## Verificação

- `/memory` mostra o `CLAUDE.md` deste projeto como carregado.
- `/permissions` mostra as regras allow / ask / deny acima (aparecem numa sessão nova).

## Lição 1 — deixar o Claude ler o repositório

### Previsão (de memória, antes de pedir o resumo ao Claude)

Mudei a mensagem de log de start em `server.js`, adicionei um helper `getUserCount()` em `db/store.js` e renomeei a variável `id` para `userId` no handler `GET /users/:id` em `routes/users.js`.

### Resumo do Claude

Analisando o `git diff` de 4 arquivos alterados:

1. **`server.js`** — a mensagem de log ao subir o servidor mudou de `"API listening on http://localhost:${PORT}"` para `"Server ready — listening on http://localhost:${PORT}"`. Cosmético, sem impacto funcional.
2. **`db/store.js`** — nova função `getUserCount()` (retorna `users.length`), exportada junto com as demais. Aditivo, não quebra nada existente.
3. **`routes/users.js`** — variável renomeada de `id` para `userId` dentro do handler `GET /:id`. Puramente uma renomeação local; comportamento idêntico.
4. **`package.json`** — `"version"` mudou de `"1.0.0"` para `"1.0.1"`. **Isso não foi mencionado na previsão e não corresponde a nenhuma mudança de comportamento nos outros três arquivos** — parece um bump de versão solto, sem changelog ou release associado. Vale confirmar se foi intencional antes de commitar.

Nenhuma outra alteração (rotas, testes, config do ESLint) foi detectada.

### A previsão pegou a mudança perdida?

Não — a previsão citou apenas as três mudanças de código (`server.js`, `db/store.js`, `routes/users.js`) e esqueceu completamente o bump de versão em `package.json`, exatamente o tipo de edição solta que passa despercebida numa revisão manual. O Claude sinalizou como não solicitada ao comparar com a previsão.
