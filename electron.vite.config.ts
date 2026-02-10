import { defineConfig } from 'electron-vite';

export default defineConfig({
  main: {
    build: {
      outDir: 'out/main'
    }
  },
  preload: {
    build: {
      outDir: 'out/preload'
    }
  },
  renderer: {
    root: 'src/renderer',
    build: {
      outDir: 'out/renderer',
      rollupOptions: {
        input: {
          main: 'src/renderer/index.html',
          settings: 'src/renderer/settings.html'
        }
      }
    }
  }
});
