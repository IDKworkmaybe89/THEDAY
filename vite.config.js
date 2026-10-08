

// https://vite.dev/config/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/THEDAY/', // Must match your exact repository name
})