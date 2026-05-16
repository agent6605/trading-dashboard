# AGENTS.md

This file provides project-wide rules for AI coding agents working on the trading-dashboard project.

## Project

**Description**: Bloomberg Terminal-style market intelligence dashboard with real-time stock data, trade ideas, and interactive charts.
**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS + Streamlit (Python)
**Package Manager**: npm (Next.js), pip (Streamlit)

---

## Essential Commands

### Next.js App (React)
- Build: `npm run build`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

### Streamlit App (Python)
- Run: `streamlit run streamlit/app.py`
- Install deps: `pip install -r streamlit/requirements.txt`

---

## Architecture Principles

### SRP
Each module has one reason to change. If its description contains "and", split it.

### SoC
Group by concern — data access (yfinance API), business logic (calculations), presentation (React components/Streamlit). Keep boundaries explicit via interfaces or events. Each component should be independently testable.

### Composition over Inheritance
Build behavior by composing smaller components. Use functional components with hooks. No class components.

### KISS
Prefer the simplest solution. Use standard libraries (yfinance, matplotlib, streamlit) before inventing new ones.

### DRY
Centralize shared logic. Use helper functions for price calculations, chart generation. No copy-paste.

---

## Coding Standards

### TypeScript (Next.js)
- NEVER use `any`. Use proper types or `unknown`.
- All functions must have explicit parameter and return type annotations.
- Use functional components only. No class components.
- Keep components under 200 lines. Extract helpers for complex logic.

### Python (Streamlit)
- Use type hints where possible
- Handle exceptions explicitly — no bare `except:`
- Use f-strings for formatting

### Error Handling
- Use try/except with specific exception types
- Handle yfinance API failures gracefully (return None, show fallback)
- Log errors for debugging

---

## Guardrails

### Scope
- Default to smallest possible change. No drive-by refactors.
- Every changed line traces to the request.
- >5 files = propose a plan first, wait for confirmation.
- No new dependencies without checking package.json/requirements.txt first.

### Evidence-First
- Read relevant files before editing.
- Test API calls locally before assuming they work.
- Record attempted approaches and outcomes before escalating.

### Prohibitions
- Do NOT silently modify AGENTS.md, CI configs, or package.json.
- No secrets or API keys in code.
- No git history rewrites (force push) unless explicitly requested.

---

## Testing

- Test Streamlit app locally with `streamlit run streamlit/app.py`
- Verify Next.js build with `npm run build`
- Check lint with `npm run lint`

---

## Verification

Before marking done: **typecheck → lint → build → confirm the app runs**.

---

## Self-Correction

When corrected:
1. **Acknowledge** specifically what went wrong.
2. **Propose**: `[LEARN] Category: One-line rule`
3. **Wait** for approval before adding to LEARNED.

### LEARNED

---

## Workflow

### Planning
Enter plan mode for architecture decisions, multi-file changes, or unclear requirements.

### Execution
- Work atomically: one concern per change.
- Run quality gates before declaring done.
- Pause after each component is complete.

### Task Organization

| Type | Location |
|------|----------|
| Features | `features/<name>/` |
| Bugs | `BUGS.md` |
| Small work | `NEXT_STEPS.md` |
| Deferred | `DEFERRED.md` |