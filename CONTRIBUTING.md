# Contributing to GA Windows Dashboard

Thanks for your interest in contributing! Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ga-win-dash.git`
3. Install dependencies: `pnpm install`
4. Start development mode: `pnpm run dev`

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run all checks before committing: `pnpm run check`
4. Commit your changes with a clear message
5. Push to your fork: `git push origin feature/your-feature`
6. Open a Pull Request

## Code Quality

Before submitting a PR, ensure all checks pass:

```bash
pnpm run check    # Runs typecheck + lint + format check
```

To auto-fix formatting and lint issues:

```bash
pnpm run lint:fix
pnpm run format
```

## Project Structure

- `src/main/` - Electron main process (Node.js)
- `src/preload/` - Secure contextBridge API
- `src/renderer/` - Renderer process (Chromium)

## Reporting Bugs

Open an [issue](https://github.com/charlesjones-dev/ga-win-dash/issues) with:

- Steps to reproduce
- Expected vs actual behavior
- Windows version and app version (Help > About)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
