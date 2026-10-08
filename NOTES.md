# NOTES

## CLAUDE.md: vad som är med och vad som medvetet lämnats utanför

**Med:**
- En rad om vad projektet är (ett litet Express-API med users och health).
- **Commands:** `npm run dev`, `npm test`, `npm run lint`, plus hur man kör en enskild testfil eller filtrerar på testnamn. Det står också att CI kör lint och test och att båda måste gå igenom.
- **Architecture:** `server.js` exporterar `app` och anropar `listen()` bara när filen körs direkt. Det finns en router per resurs i `routes/`, och all data går via `db/store.js`. Där står också sådant som inte syns direkt i koden: storen delas mellan tester i samma fil, `getAllUsers()` returnerar den riktiga arrayen och inte en kopia, och `.env` laddas aldrig eftersom projektet saknar dotenv.
- **Conventions:** CommonJS i stället för ES-moduler, ingen direkt åtkomst till storen från routes, felformatet `{ error }` med statuskoderna 400/404/201, `node:test` + `supertest` i stället för Jest/Mocha, och `Number(req.params.id)` eftersom storen jämför med `===`. Varje regel är skriven så att Claude kan följa den utan att behöva fråga.

**Utanför, med flit:**
- Hemligheter och innehållet i `.env`. CLAUDE.md checkas in och läses in i varje session.
- En fillista och beskrivningar av varje funktion. Claude kan läsa koden själv, och en kopia blir snabbt inaktuell.
- Installations- och kursinstruktioner från README. De handlar om kursen, inte om hur man arbetar i koden.
- Kodstil som ESLint redan kontrollerar, och engångsuppgifter som "lägg till endpoint X". De hör hemma i en prompt och inte i ett permanent minne.

Målet var att filen bara ska innehålla sådant som Claude annars hade gissat fel på.

## Rättigheter i `.claude/settings.json`

Varje regel finns i två varianter, en för `Bash` och en för `PowerShell`, eftersom jag kör Windows och Claude kan använda båda skalen.

| Typ | Regel | Varför |
|---|---|---|
| allow | `npm test:*` | Körs ofta och ändrar ingenting, så det behövs ingen fråga varje gång. |
| ask | `git push:*` | En push syns för andra, så jag vill bekräfta varje gång. |
| deny | `Read(./.env)` | `.env` är platsen för riktiga hemligheter. |
| deny | `git push --force:*` | En force-push kan skriva över historik på remote. |

**Vad kan gå fel:**
- **`allow npm test`** kör det som står i `"test"`-skriptet i `package.json`. Om någon (eller Claude) ändrar skriptet kan godtycklig kod köras utan fråga. Därför bör ändringar i `package.json` granskas.
- **Utan deny på `.env`** kan Claude läsa filen, och då hamnar hemligheterna i konversationen och skickas till modellen. Regeln är ändå inte vattentät. Den stoppar bara Read-verktyget, så `cat .env` eller `Get-Content .env` i ett skal, ett Node-skript som läser filen eller filer som `.env.local` fångas inte.
- **Utan deny på force-push** kan en `git push --force` skriva över andras commits på remote. Regeln matchar bara på prefix, så `git push -f`, `git push --force-with-lease` och `git push origin +main` täcks inte av deny. De faller i stället under ask-regeln `git push:*` och kräver fortfarande en bekräftelse. Därför är ask-regeln det verkliga skyddsnätet.
- Rättigheterna är ett stöd och ingen säkerhetsgräns. Det riktiga skyddet för `main` är branch protection på GitHub.

## Verifiering

- `CLAUDE.md` laddas: Claude besvarade "How do I run the tests here?" utifrån filen utan extra förklaring.
- `/memory` och `/permissions`: _fyll i efter kontroll i en ny session._
