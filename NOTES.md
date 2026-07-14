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
