export interface AppConfig {
  gridColumns: number;
  gridRows: number;
  cellUrls: Record<number, string>;
  windowBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ElectronAPI {
  getConfig: () => Promise<AppConfig>;
  saveConfig: (config: Partial<AppConfig>) => Promise<void>;
  saveUrl: (cellId: number, url: string) => Promise<void>;
  getUrl: (cellId: number) => Promise<string>;
  toggleFullscreen: () => Promise<void>;
  openSettings: () => Promise<void>;
  onRefreshAll: (callback: () => void) => void;
  onConfigChanged: (callback: (config: AppConfig) => void) => void;
  onFullscreenChanged: (callback: (isFullscreen: boolean) => void) => void;
}

interface WebviewElement extends HTMLElement {
  reload(): void;
  getURL(): string;
  src: string;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export type { WebviewElement };
