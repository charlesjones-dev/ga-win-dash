import { ipcMain, BrowserWindow } from 'electron';
import path from 'path';
import { getConfig, saveConfig, saveUrl, getUrl } from './store';

let settingsWindow: BrowserWindow | null = null;

function openSettingsWindow(mainWindow: BrowserWindow): void {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    parent: mainWindow,
    modal: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    title: 'Settings',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  settingsWindow.setMenuBarVisibility(false);

  if (process.env.ELECTRON_RENDERER_URL) {
    settingsWindow.loadURL(`${process.env.ELECTRON_RENDERER_URL}/settings.html`);
  } else {
    settingsWindow.loadFile(path.join(__dirname, '../renderer/settings.html'));
  }

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

export function registerIpcHandlers(mainWindow: BrowserWindow): { openSettings: () => void } {
  ipcMain.handle('get-config', () => {
    return getConfig();
  });

  ipcMain.handle('save-config', (_event, config) => {
    saveConfig(config);
    mainWindow.webContents.send('config-changed', getConfig());
  });

  ipcMain.handle('save-url', (_event, cellId: number, url: string) => {
    saveUrl(cellId, url);
  });

  ipcMain.handle('get-url', (_event, cellId: number) => {
    return getUrl(cellId);
  });

  ipcMain.handle('toggle-fullscreen', () => {
    const focused = BrowserWindow.getFocusedWindow();
    if (focused) {
      focused.setFullScreen(!focused.isFullScreen());
      focused.webContents.send('fullscreen-changed', focused.isFullScreen());
    }
  });

  ipcMain.handle('open-settings', () => {
    openSettingsWindow(mainWindow);
  });

  return {
    openSettings: () => openSettingsWindow(mainWindow)
  };
}
