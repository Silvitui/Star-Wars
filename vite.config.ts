import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  server: {
    port: 4200,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
