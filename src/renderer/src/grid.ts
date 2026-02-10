import { createCell } from './cell';

export function buildGrid(
  container: HTMLElement,
  columns: number,
  rows: number,
  cellUrls: Record<number, string>
): void {
  container.innerHTML = '';
  container.style.setProperty('--columns', String(columns));
  container.style.setProperty('--rows', String(rows));

  const totalCells = columns * rows;
  for (let i = 0; i < totalCells; i++) {
    const url = cellUrls[i] || 'https://analytics.google.com/';
    const cell = createCell(i, url);
    container.appendChild(cell);
  }
}

export function refreshAllCells(): void {
  const webviews = document.querySelectorAll('webview');
  webviews.forEach((wv) => {
    (wv as unknown as { reload(): void }).reload();
  });
}
