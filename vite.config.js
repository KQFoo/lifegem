import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/lifegem/',
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
