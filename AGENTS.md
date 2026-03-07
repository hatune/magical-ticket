# Repository Guidelines

## Project overview

- とあるチケット申し込みサイトに対して、楽をするためのスクリプトです。
- 3つあるスクリプトファイルはすべて同じサイトのフォーム入力を簡略化するためのものです。
- 楽をするためであって、全自動化を目的としていません。

## Project Structure & Module Organization
- Root scripts:
  - `main.mjs`: Playwright-based browser automation (navigation + form assist).
  - `app.ts`: outputs browser-console JavaScript for manual form filling.
  - `app.ps1`: PowerShell 7 variant of the same assist flow.
- Config and data:
  - `settings.default.json`: template.
  - `settings.json`: local runtime values (personal data, URL, payment/login options). Do not commit secrets.
- Tooling:
  - `playwright.config.ts`: Playwright test config (`testDir: ./e2e`), though `e2e/` is currently not present.

## Build, Test, and Development Commands
- `npm install`: install Node dependencies.
- `npx playwright install`: install browser binaries used by Playwright.
- `node main.mjs`: run end-to-end assist automation.
- `node app.ts`: generate console script for manual browser execution.
- `pwsh ./app.ps1 -ExecutionPolicy Bypass`: run PowerShell 7 script.
- `node --check main.mjs`: quick syntax check before committing.
- Optional (once tests exist): `npx playwright test`.

## Coding Style & Naming Conventions
- Use ES modules for Node scripts (`import ... from`).
- Prefer 2-space indentation and semicolons, matching existing `main.mjs`.
- Keep selectors and field mappings explicit and readable.
- Use clear helper names (`fillByName`, `selectByName`) and avoid magic numbers; extract constants (for example long timeouts).
- Keep comments short and practical; prefer Japanese labels where they match existing field names.

## Testing Guidelines
- Current status: no committed automated tests under `e2e/`.
- Minimum validation for script changes:
  - Run `node --check main.mjs`.
  - Execute `node main.mjs` against a safe test entry page and verify key manual checkpoints.
- When adding tests, place files under `e2e/*.spec.ts` and run with `npx playwright test`.

## Commit & Pull Request Guidelines
- Existing history favors short, direct subjects (Japanese or English). Use imperative style, e.g.:
  - `Refactor main.mjs for readability and reuse`
  - `クレカ有効期限入力修正`
- Keep commits focused to one behavior/theme.
- PRs should include:
  - what user flow changed,
  - how it was verified (commands + manual steps),
  - screenshots/log snippets when UI steps changed,
  - confirmation that sensitive values in `settings.json` were not committed.
