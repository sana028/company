import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    define: {
      'process.env.VITE_SERVER_URL':JSON.stringify(env.VITE_SERVER_URL)
    },
    server: {
      port: parseInt(env.VITE_PORT) || 8080
    }
  };
});
