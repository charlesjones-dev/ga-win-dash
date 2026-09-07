# Security Policy

**Retired — September 2026.** This project is unmaintained. No further maintenance, features, bug fixes, or security updates will be provided.

## Supported Versions

No versions are supported, including the historical 1.0.x releases.

## Vulnerability Reports and Support

This project no longer provides vulnerability triage, response commitments, or security fixes. The former reporting channel and 48-hour response commitment are retired. Do not rely on this repository for a response or remediation.

Independent forks must establish their own security policies and reporting channels. See [SUPPORT.md](SUPPORT.md) for retirement information.

## Historical Security Considerations

The following describes the original implementation, not a current security assurance.

The application was built with these Electron security measures:

- `contextIsolation: true` - renderer process cannot access Node.js APIs directly
- `nodeIntegration: false` - prevents arbitrary code execution in the renderer
- Content Security Policy (CSP) headers
- Navigation restrictions on the main window
- All IPC communication goes through a secure `contextBridge` preload script
