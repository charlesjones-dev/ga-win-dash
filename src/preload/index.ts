import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config: Record<string, unknown>) => ipcRenderer.invoke('save-config', config),
  saveUrl: (cellId: number, url: string) => ipcRenderer.invoke('save-url', cellId, url),
  getUrl: (cellId: number) => ipcRenderer.invoke('get-url', cellId),
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),
  openSettings: () => ipcRenderer.invoke('open-settings'),
  onRefreshAll: (callback: () => void) => {
    ipcRenderer.on('refresh-all', callback);
  },
  onConfigChanged: (callback: (config: Record<string, unknown>) => void) => {
    ipcRenderer.on('config-changed', (_e, config) => callback(config));
  },
  onFullscreenChanged: (callback: (isFullscreen: boolean) => void) => {
    ipcRenderer.on('fullscreen-changed', (_e, isFullscreen) => callback(isFullscreen));
  }
});
