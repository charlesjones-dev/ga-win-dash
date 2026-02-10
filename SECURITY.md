# Security Policy

## Supported Versions

| Version | Supported |
|---------|:---------:|
| 1.0.x   | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do not open a public issue for security vulnerabilities.**

Instead, please email security concerns to the repository owner via the contact information on [charlesjones.dev](https://charlesjones.dev).

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

You can expect an initial response within 48 hours. Once confirmed, a fix will be prioritized and released as soon as possible.

## Security Considerations

This application uses Electron with the following security measures:

- `contextIsolation: true` - renderer process cannot access Node.js APIs directly
- `nodeIntegration: false` - prevents arbitrary code execution in the renderer
- Content Security Policy (CSP) headers
- Navigation restrictions on the main window
- All IPC communication goes through a secure `contextBridge` preload script
