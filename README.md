# GA Windows Dashboard

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

## Requirements

- Windows 10 or later (x64)
- Node.js 18+ and pnpm (for building from source)

## Installation

### Option 1: Download Portable Executable

Download `ga-win-dash.exe` from the [Releases](https://github.com/charlesjones-dev/ga-win-dash/releases) page. No installation needed, just run it.

### Option 2: Build from Source

```bash
git clone https://github.com/charlesjones-dev/ga-win-dash.git
cd ga-win-dash
pnpm install
pnpm run build
pnpm run package
```

The portable `.exe` will be generated in the `dist/` directory.

### Option 3: Development Mode

```bash
git clone https://github.com/charlesjones-dev/ga-win-dash.git
cd ga-win-dash
pnpm install
pnpm run dev
```

This launches the app with hot reload for development.

## Usage

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

## Building

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

Building the `.msi` installer requires [WiX Toolset v3](https://wixtoolset.org/). Install it via winget:

```bash
pnpm run setup:msi
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
