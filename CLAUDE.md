# Built with Claude

This project was built with assistance from Claude (Anthropic's AI assistant) using [Claude Code](https://claude.com/claude-code).

## Development Process

GA Windows Dashboard was created as a Windows port of [GA Mac Dashboard](https://github.com/charlesjones-dev/ga-mac-dash), built through an iterative development process with Claude Code using a team of specialized AI agents.

### What Claude Helped With

- **Architecture Planning**: A team of architect and researcher agents analyzed the Mac codebase and designed the Electron architecture, mapping every SwiftUI component to its web equivalent
- **Feature Mapping**: Detailed 1:1 mapping from macOS APIs (WKWebView, UserDefaults, NotificationCenter) to Electron equivalents (webview tags, electron-store, IPC)
- **Parallel Development**: Three developer agents built the main process, renderer UI, and settings window simultaneously
- **Integration**: Resolved cross-process communication, ESM compatibility, and build configuration issues
- **Security Hardening**: Applied Electron security best practices (contextIsolation, CSP, navigation restrictions)

### Technologies Used

- **Electron 33**: Desktop application framework with Chromium and Node.js
- **TypeScript 5.7**: Type-safe development across main, preload, and renderer processes
- **electron-vite**: Modern build tooling with hot module replacement
- **electron-store**: Persistent JSON storage (UserDefaults equivalent)
- **CSS Grid**: Dynamic grid layout system

### Key Features Implemented

1. Configurable grid layout (1-6 columns x 1-6 rows)
2. Shared Google Analytics session via webview partition
3. Per-cell address bars with URL validation
4. Fullscreen mode hiding all UI chrome
5. Keyboard shortcuts (Ctrl+R, Ctrl+Shift+F, Ctrl+,)
6. Persistent URLs and window state
7. Settings window with live grid reconfiguration

### Development Approach

The project was built using Claude Code's team orchestration:

1. **Planning phase**: Three agents (architect, feature-mapper, researcher) worked in parallel to analyze the Mac codebase, design the Electron architecture, and research current best practices
2. **Scaffolding**: Team lead set up the project structure, configs, dependencies, and shared type contracts
3. **Build phase**: Three developer agents (main-dev, renderer-dev, settings-dev) built their components in parallel against the shared contracts
4. **Integration**: Team lead resolved cross-component issues (ESM bundling, API mismatches) and verified the build

### Human Contributions

While Claude provided significant assistance, human input was essential for:
- Defining the initial requirements and choosing the tech stack (Electron over Tauri/.NET)
- Selecting distribution formats (portable .exe, NSIS installer, MSI)
- Deciding on 1:1 feature parity scope
- Testing the application with real Google Analytics dashboards
- Deciding to open source the project

## For Developers

This project serves as an example of:
- Building Electron apps with TypeScript and electron-vite
- Managing multiple webviews with shared session partitions
- Secure IPC communication via contextBridge
- CSS Grid for dynamic, responsive layouts
- Porting native macOS apps to Windows/Electron

## Transparency

This CLAUDE.md file exists to be transparent about the development process and acknowledge the role of AI assistance in creating this application. The code is open source (MIT License) and available for anyone to learn from, modify, or contribute to.

---

**Built with:** [Claude Code](https://claude.com/claude-code)
**Model:** Claude Opus 4.6
**Date:** February 2026
