# GA Windows Dashboard

> [!WARNING]
> **Retired — September 2026.** This project is unmaintained and will receive no further maintenance, features, bug fixes, or security updates. Support and contributions to this repository have ended. The source and historical documentation remain available; independent forks are welcome under the existing [MIT License](LICENSE). See [support and retirement information](SUPPORT.md).

A Windows desktop application for viewing multiple Google Analytics dashboards simultaneously in a customizable grid layout. Built with Electron and TypeScript.

Windows port of [GA Mac Dashboard](https://github.com/charlesjones-dev/ga-mac-dash).

## Features

- **Grid Layout**: View multiple Google Analytics dashboards simultaneously in a customizable grid (default 2x3)
- **Shared Sessions**: Login once to Google Analytics, and all grid cells share the same session
- **Minimal UI**: Clean, minimal address bar and refresh button for each cell
- **Fullscreen Mode**: Hide all controls for a distraction-free dashboard view
- **Persistent URLs**: All URLs are automatically saved and restored between sessions
- **Portable**: Single .exe, no installation required
- **Multiple Distribution Formats**: Portable `.exe`, NSIS installer, or `.msi` package

## Historical Requirements

- Windows 10 or later (x64)
- Node.js 18+ and pnpm (for building from source)

## Historical Setup

These instructions describe the retired project and are retained for reference by independent forks. They are not a recommendation to install or run the unmaintained application.

### Historical Release Artifacts

The [Releases](https://github.com/charlesjones-dev/ga-win-dash/releases) page retains the original Windows binaries as historical artifacts. They are unsupported and will receive no security updates.

### Historical Source Build

```bash
git clone https://github.com/charlesjones-dev/ga-win-dash.git
cd ga-win-dash
pnpm install
pnpm run build
pnpm run package
```

The portable `.exe` will be generated in the `dist/` directory.

### Historical Development Mode

```bash
git clone https://github.com/charlesjones-dev/ga-win-dash.git
cd ga-win-dash
pnpm install
pnpm run dev
```

This launches the app with hot reload for development.

## Historical Usage

### Adding Dashboard URLs

1. Click on the address bar in any grid cell
2. Paste your Google Analytics dashboard URL
3. Press Enter to load the dashboard

### Keyboard Shortcuts

- `Ctrl+R` - Refresh all dashboards
- `Ctrl+Shift+F` - Toggle fullscreen mode
- `Ctrl+,` - Open settings

### Settings

Access settings via the gear icon or press `Ctrl+,` to customize:

- **Grid Layout**: Adjust the number of columns and rows (1-6 each)
- View current grid configuration

### Tips

- Login to Google Analytics in any cell, and all cells will share the session
- URLs are automatically saved and will be restored when you relaunch the app
- Use fullscreen mode for a clean, distraction-free monitoring experience

## Architecture

- **Electron 33**: Cross-platform desktop framework
- **TypeScript**: Type-safe development across all processes
- **electron-vite**: Build tooling with HMR for development
- **electron-store**: Persistent JSON storage for configuration
- **CSS Grid**: Dynamic grid layout for dashboard cells
- **WebView tags**: Isolated browser instances with shared session partition

### Project Structure

```
ga-win-dash/
├── src/
│   ├── main/                   # Main process (Node.js)
│   │   ├── index.ts            # App entry point, window management
│   │   ├── store.ts            # Persistent config storage
│   │   ├── ipc-handlers.ts     # IPC message handlers
│   │   └── menu.ts             # Application menu + shortcuts
│   ├── preload/                # Secure bridge
│   │   └── index.ts            # contextBridge API
│   └── renderer/               # Renderer process (Chromium)
│       ├── index.html          # Main window
│       ├── settings.html       # Settings window
│       ├── src/
│       │   ├── main.ts         # Main window logic
│       │   ├── grid.ts         # Grid layout management
│       │   ├── cell.ts         # Cell component (address bar + webview)
│       │   ├── settings.ts     # Settings window logic
│       │   └── types.ts        # Shared TypeScript interfaces
│       └── styles/
│           ├── main.css        # Main window styles
│           └── settings.css    # Settings window styles
├── resources/                  # Build resources
│   └── icon.ico                # Windows app icon
├── electron-builder.yml        # Packaging configuration
├── electron.vite.config.ts     # Build configuration
└── package.json
```

## Historical Building

The following build procedures are preserved for reference and are no longer maintained.

### Generate App Icon (Optional)

If you modify the icon design:

```bash
pip install Pillow
python generate_icon.py
```

### Build Commands

```bash
pnpm run dev               # Development mode with hot reload
pnpm run build             # Production build
pnpm run package           # Build portable .exe
pnpm run package:installer # Build NSIS installer .exe
pnpm run package:msi       # Build Windows Installer .msi
pnpm run typecheck         # TypeScript type checking
pnpm run lint              # ESLint check
pnpm run lint:fix          # ESLint auto-fix
pnpm run format            # Prettier auto-format
pnpm run format:check      # Prettier check only
pnpm run check             # Run all checks (typecheck + lint + format)
pnpm run audit:deps        # Dependency vulnerability scan
pnpm run audit:sast        # Semgrep static analysis (requires Docker)
pnpm run audit:all         # Run both audits in parallel
pnpm run clean             # Remove node_modules, out, and dist
```

### MSI Prerequisites

The historical `.msi` build required [WiX Toolset v3](https://wixtoolset.org/), with this winget setup command:

```bash
pnpm run setup:msi
```

## Contributing

This repository no longer accepts issues, pull requests, or feature requests. Independent forks are welcome under the [MIT License](LICENSE). See [CONTRIBUTING.md](CONTRIBUTING.md) for the historical development workflow and [SUPPORT.md](SUPPORT.md) for retirement information.

## License

MIT License - see [LICENSE](LICENSE) for details.
