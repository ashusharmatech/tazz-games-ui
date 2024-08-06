import { defineConfig, loadEnv } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss"

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const config = {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react(),
      TanStackRouterVite(),
      tsconfigPaths()
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    },
  };
  return defineConfig(config);
};