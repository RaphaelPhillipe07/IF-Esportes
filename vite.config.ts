import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * GitHub Pages (site de projeto): https://<usuario>.github.io/IF-Esportes/
 * A base precisa ser o nome do repositório, com barras no início e no fim.
 * Se o deploy for em domínio próprio ou no repositório <usuario>.github.io,
 * troque para '/'.
 */
const PAGES_BASE = '/IF-Esportes/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? PAGES_BASE : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
}))
