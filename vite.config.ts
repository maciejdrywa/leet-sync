import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { crx } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import manifest from './manifest.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
})
