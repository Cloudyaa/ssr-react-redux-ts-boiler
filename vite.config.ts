import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {port: 3000},
    build: {
        ssr: "src/entry-server.tsx", // punkt wejścia dla serwera
        outDir: "dist/server",
        rollupOptions: {
            input: "src/entry-server.tsx",
        },
    },
    ssr: {
        external: ["react-router-dom", "express"]
    },
});
