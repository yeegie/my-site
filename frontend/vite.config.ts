import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST,
      port: parseInt(env.VITE_PORT),
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
        "@app": path.resolve(__dirname, './src/app'),
        "@pages": path.resolve(__dirname, './src/pages'),
        "@widgets": path.resolve(__dirname, './src/widgets'),
        "@features": path.resolve(__dirname, './src/features'),
        "@entities": path.resolve(__dirname, './src/entities'),
        "@shared": path.resolve(__dirname, './src/shared'),
      },
    },
    define: {
      'import.meta.env.API_URL': JSON.stringify(env.VITE_API_URL),
      'import.meta.env.ADMIN_AUTH': env.VITE_ADMIN_AUTH,
      'import.meta.env.REPOSITORY': env.VITE_PROJECT_REPOSITORY
    }
  }
})
