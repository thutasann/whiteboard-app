import { defineConfig } from 'vite'
import reactJS from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactJS(), viteTsconfigPaths()],
  build: {
    sourcemap: false,
  },
  server: { open: true, host: true, port: 3000 },
  preview: { port: 3300 },
})
