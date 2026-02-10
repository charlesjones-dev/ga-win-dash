import type { WebviewElement } from './types';

export function createCell(cellId: number, initialUrl: string): HTMLElement {
  const cell = document.createElement('div');
  cell.classList.add('grid-cell');
  cell.dataset.cellId = String(cellId);

  const addressBar = document.createElement('div');
  addressBar.classList.add('address-bar');

  const refreshBtn = document.createElement('button');
  refreshBtn.classList.add('refresh-btn');
  refreshBtn.textContent = '\u21BB';
  refreshBtn.title = 'Refresh';

  const urlInput = document.createElement('input');
  urlInput.classList.add('url-input');
  urlInput.type = 'text';
  urlInput.value = initialUrl;
  urlInput.placeholder = 'Enter URL';

  addressBar.appendChild(refreshBtn);
  addressBar.appendChild(urlInput);

  const webview = document.createElement('webview') as unknown as WebviewElement;
  webview.setAttribute('src', initialUrl);
  webview.setAttribute('partition', 'persist:ga-session');
  webview.setAttribute('allowpopups', 'false');

  // Enter key on input: validate URL, navigate, and save
  urlInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      let url = urlInput.value.trim();
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      urlInput.value = url;
      webview.src = url;
      window.api.saveUrl(cellId, url);
    }
  });

  // Refresh button click
  refreshBtn.addEventListener('click', () => {
    webview.reload();
  });

  // Update input when webview navigates
  webview.addEventListener('did-navigate', () => {
    const currentUrl = webview.getURL();
    urlInput.value = currentUrl;
    window.api.saveUrl(cellId, currentUrl);
  });

  webview.addEventListener('did-navigate-in-page', () => {
    const currentUrl = webview.getURL();
    urlInput.value = currentUrl;
    window.api.saveUrl(cellId, currentUrl);
  });

  cell.appendChild(addressBar);
  cell.appendChild(webview);

  return cell;
}
