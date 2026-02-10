import { AppConfig } from './types';
import { buildGrid, refreshAllCells } from './grid';

document.addEventListener('DOMContentLoaded', async () => {
  const config: AppConfig = await window.api.getConfig();
  const container = document.getElementById('grid-container');
  if (!container) return;

  buildGrid(container, config.gridColumns, config.gridRows, config.cellUrls);

  // Toolbar buttons
  const btnRefreshAll = document.getElementById('btn-refresh-all');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnSettings = document.getElementById('btn-settings');

  btnRefreshAll?.addEventListener('click', () => {
    refreshAllCells();
  });

  btnFullscreen?.addEventListener('click', () => {
    window.api.toggleFullscreen();
  });

  btnSettings?.addEventListener('click', () => {
    window.api.openSettings();
  });

  // IPC listeners from main process
  window.api.onRefreshAll(() => {
    refreshAllCells();
  });

  window.api.onConfigChanged((newConfig: AppConfig) => {
    buildGrid(container, newConfig.gridColumns, newConfig.gridRows, newConfig.cellUrls);
  });

  window.api.onFullscreenChanged((isFullscreen: boolean) => {
    document.body.classList.toggle('fullscreen', isFullscreen);
  });
});
