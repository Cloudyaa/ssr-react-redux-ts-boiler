import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import vercel from 'vite-plugin-vercel';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vercel()],
  server: { port: process.env.PORT as unknown as number },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
    rollupOptions: {
      input: 'src/entry-server.tsx',
    },
  },
  ssr: {
    external: ['react-router-dom', 'express'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
