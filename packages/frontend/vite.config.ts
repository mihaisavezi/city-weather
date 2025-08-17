import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '../shared/src',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://backend:3001', // Use the docker service name
        changeOrigin: true,
      },
    },
  },
});
