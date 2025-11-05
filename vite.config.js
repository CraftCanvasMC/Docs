import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: ["docs.canvasmc.io"],
  },
  server: {
    host: true,
  },
});
