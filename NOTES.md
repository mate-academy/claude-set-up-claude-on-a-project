# NOTES.md

## CLAUDE.md

Do `CLAUDE.md` jsem přidal základní popis projektu, nejčastěji používané příkazy, důležité konvence a stručný popis architektury. Záměrně jsem vynechal podrobnosti, které lze snadno zjistit přímo z kódu, například informace o CI workflow a příkaz pro spuštění jednotlivého testovacího souboru. Cílem je, aby byl soubor krátký a obsahoval pouze informace užitečné pro další práci.

## Permissions

Povolil jsem automatické spouštění `npm test`, protože jde o bezpečný příkaz, který se používá často. U `git push` jsem nastavil vždy požadované potvrzení, protože změny odesílá do vzdáleného repozitáře. Zakázal jsem čtení `.env` a `git push --force`, protože `.env` může obsahovat citlivé údaje a force push může přepsat historii repozitáře.

## Ověření

Pomocí `/memory` jsem ověřil, že Claude Code načetl projektový soubor `CLAUDE.md`. Pomocí `/permissions` jsem ověřil nastavená pravidla pro povolené, vyžadující potvrzení a zakázané příkazy.

