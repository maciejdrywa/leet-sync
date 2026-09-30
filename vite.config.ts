import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    rolldownOptions: {
      input: {
        popup: "./index.html",
        background: "./src/background/index.ts"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
})
