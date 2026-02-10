import Store from 'electron-store';

interface AppConfig {
  gridColumns: number;
  gridRows: number;
  cellUrls: Record<number, string>;
  windowBounds?: Electron.Rectangle;
}

const store = new Store<AppConfig>({
  defaults: {
    gridColumns: 2,
    gridRows: 3,
    cellUrls: {}
  }
});

const DEFAULT_URL = 'https://analytics.google.com/';

export function getConfig(): AppConfig {
  return {
    gridColumns: store.get('gridColumns'),
    gridRows: store.get('gridRows'),
    cellUrls: store.get('cellUrls'),
    windowBounds: store.get('windowBounds')
  };
}

export function saveConfig(partial: Partial<AppConfig>): void {
  if (partial.gridColumns !== undefined) store.set('gridColumns', partial.gridColumns);
  if (partial.gridRows !== undefined) store.set('gridRows', partial.gridRows);
  if (partial.cellUrls !== undefined) store.set('cellUrls', partial.cellUrls);
  if (partial.windowBounds !== undefined) store.set('windowBounds', partial.windowBounds);
}

export function saveUrl(cellId: number, url: string): void {
  store.set(`cellUrls.${cellId}`, url);
}

export function getUrl(cellId: number): string {
  return store.get(`cellUrls.${cellId}`, DEFAULT_URL) as string;
}

export { store };
