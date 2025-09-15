import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel'
import { fileURLToPath } from 'url';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(), 
      vercel()
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
      ]
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  });
};
