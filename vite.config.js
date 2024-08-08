import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite-router-dom",
  plugins: [react()],
  // build: {
  //   outDir: 'dist',
  //   // assetsDir: "dist",
  // },
})
