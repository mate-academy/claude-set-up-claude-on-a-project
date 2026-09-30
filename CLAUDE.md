# CLAUDE.md

## Commands

- Use `jupyter lab` to work with Jupyter notebooks.
- Run Python scripts with `python src/<script_name>.py` when applicable.
- Run notebooks from top to bottom to ensure reproducibility.
- Store reusable SQL queries in the `sql/` directory.

## Conventions

### Python
- Use clear, readable Python code.
- Use `snake_case` for variables and functions.
- Check data types, missing values, duplicates, and unusual values during data analysis.

### SQL
- Write clear and readable SQL queries.
- Use reusable queries in the `sql/` directory.

### Data
- Keep raw data in `data/raw/` unchanged.
- Save cleaned and processed data in `data/processed/`.
- Document important assumptions, data sources, and findings.
- Never commit credentials, API keys, or sensitive data.

## Architecture

The project follows this structure:

- `data/raw/` — original raw data
- `data/processed/` — cleaned and processed data
- `notebooks/` — Jupyter notebooks for analysis
- `sql/` — reusable SQL queries
- `src/` — Python scripts
- `outputs/` — analysis results and reports
- `docs/` — project documentation

Typical workflow:

**source → extraction → cleaning → analysis → reports**
