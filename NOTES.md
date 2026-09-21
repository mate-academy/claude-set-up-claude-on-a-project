# NOTES
## CLAUDE.md
Додав опис проекту, основні команди (dev, test, lint), конвенції (ES modules, async/await) та архітектуру. Видалив чутливі дані та очевидні речі з коду.
## Permissions
- allow: npm test — безпечна команда для запуску тестів
- deny: Read .env та git push --force — захист від витоку секретів та втрати комітів
- ask: git push — хочу підтвердження перед пушем
