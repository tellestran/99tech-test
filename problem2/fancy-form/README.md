# Exchange Currency Project

Quick start for installing dependencies, running the dev server, and executing tests.

## Setup
1) Install dependencies

```bash
npm i
```

2) Start the development server (Vite)

```bash
npm run dev
```

3) Run tests (Jest + Testing Library)

```bash
npm test
```

## Notes
- Dev server runs with Vite and supports Hot Module Replacement (HMR).
- Tests use Jest, @testing-library/react, and @testing-library/user-event.
- If you encounter TypeScript import issues while testing, ensure `esModuleInterop` is enabled in the Jest tsconfig (already configured here).

 
