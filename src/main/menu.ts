import { Menu, BrowserWindow, MenuItemConstructorOptions, app, dialog } from 'electron';
import { checkForUpdates } from './updater';

interface MenuOptions {
  mainWindow: BrowserWindow;
  openSettings: () => void;
}

export function createMenu({ mainWindow, openSettings }: MenuOptions): void {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Refresh All',
          accelerator: 'CmdOrCtrl+R',
          click: (): void => {
            mainWindow.webContents.send('refresh-all');
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'CmdOrCtrl+Shift+F',
          click: (): void => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
            mainWindow.webContents.send('fullscreen-changed', mainWindow.isFullScreen());
          }
        }
      ]
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Open Settings',
          accelerator: 'CmdOrCtrl+,',
          click: (): void => {
            openSettings();
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Check for Updates',
          click: (): void => {
            checkForUpdates(mainWindow);
          }
        },
        { type: 'separator' },
        {
          label: 'About',
          click: (): void => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About GA Windows Dashboard',
              message: 'GA Windows Dashboard',
              detail: `Version ${app.getVersion()}\n\nA Windows desktop application for viewing multiple Google Analytics dashboards in a configurable grid layout.\n\nhttps://github.com/charlesjones-dev/ga-win-dash`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
