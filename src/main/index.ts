import { app, BrowserWindow } from 'electron';
import path from 'path';
import { getConfig, saveConfig } from './store';
import { registerIpcHandlers } from './ipc-handlers';
import { createMenu } from './menu';
import { checkForUpdates } from './updater';

let mainWindow: BrowserWindow | null = null;

const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createMainWindow();
  });
}

function createMainWindow(): void {
  const config = getConfig();
  const bounds = config.windowBounds;

  mainWindow = new BrowserWindow({
    width: bounds?.width ?? 1200,
    height: bounds?.height ?? 800,
    x: bounds?.x,
    y: bounds?.y,
    minWidth: 800,
    minHeight: 600,
    title: 'GA Windows Dashboard',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webviewTag: true
    }
  });

  const { openSettings } = registerIpcHandlers(mainWindow);
  createMenu({ mainWindow, openSettings });

  mainWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault();
  });

  const saveBounds = (): void => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isFullScreen()) {
      saveConfig({ windowBounds: mainWindow.getBounds() });
    }
  };

  mainWindow.on('resize', saveBounds);
  mainWindow.on('move', saveBounds);

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) checkForUpdates(mainWindow);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  app.quit();
});
