# Contributing to GA Windows Dashboard

**Retired — September 2026.** This repository is unmaintained and no longer accepts contributions, pull requests, bug reports, or feature requests. There will be no further maintenance, features, bug fixes, or security updates.

Independent forks are welcome under the existing [MIT License](LICENSE). Development and support for a fork are the responsibility of its maintainers. See [SUPPORT.md](SUPPORT.md).

The procedures below are historical documentation for independent forks, not an invitation to install the retired application or submit changes here.

## Historical Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ga-win-dash.git`
3. Install dependencies: `pnpm install`
4. Start development mode: `pnpm run dev`

## Historical Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run all checks before committing: `pnpm run check`
4. Commit your changes with a clear message
5. Push to your fork: `git push origin feature/your-feature`
6. The former workflow ended with a pull request to this repository; that contribution process is now closed.

## Historical Code Quality Checks

The former development workflow used these checks:

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

Bug reports are no longer accepted or triaged. No fixes will be provided. For an independently maintained fork, follow that fork's reporting policy.

## License

The existing [MIT License](LICENSE) remains unchanged. Independent forks must comply with its terms, including retaining the copyright and permission notice.
