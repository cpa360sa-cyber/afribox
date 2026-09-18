import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this as a project site at <user>.github.io/afribox/,
// so every asset URL needs the /afribox/ prefix.
export default defineConfig({
  base: '/afribox/',
  plugins: [react()],
})
