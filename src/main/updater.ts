import { app, dialog, shell, BrowserWindow } from 'electron';
import { net } from 'electron';

const REPO_OWNER = 'charlesjones-dev';
const REPO_NAME = 'ga-win-dash';
const RELEASES_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

function isNewerVersion(latest: string, current: string): boolean {
  const latestParts = latest.replace(/^v/, '').split('.').map(Number);
  const currentParts = current.split('.').map(Number);

  for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i++) {
    const l = latestParts[i] ?? 0;
    const c = currentParts[i] ?? 0;
    if (l > c) return true;
    if (l < c) return false;
  }
  return false;
}

export function checkForUpdates(parentWindow: BrowserWindow): void {
  const request = net.request({
    url: API_URL,
    method: 'GET'
  });

  request.setHeader('User-Agent', `${REPO_NAME}/${app.getVersion()}`);

  let body = '';

  request.on('response', (response) => {
    if (response.statusCode !== 200) return;

    response.on('data', (chunk) => {
      body += chunk.toString();
    });

    response.on('end', () => {
      try {
        const release = JSON.parse(body);
        const latestVersion = release.tag_name;
        if (!latestVersion) return;

        if (isNewerVersion(latestVersion, app.getVersion())) {
          dialog
            .showMessageBox(parentWindow, {
              type: 'info',
              title: 'Update Available',
              message: `A new version is available: ${latestVersion}`,
              detail: `You are running v${app.getVersion()}. Would you like to download the latest version?`,
              buttons: ['Download', 'Later'],
              defaultId: 0,
              cancelId: 1
            })
            .then(({ response }) => {
              if (response === 0) {
                shell.openExternal(RELEASES_URL);
              }
            });
        }
      } catch {
        // Silently ignore parse errors
      }
    });
  });

  request.on('error', () => {
    // Silently ignore network errors
  });

  request.end();
}
