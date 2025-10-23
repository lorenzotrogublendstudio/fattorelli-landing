import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  // ...existing code...
  server: {
    proxy: {
      '/api/contact': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api\/contact$/, '/contact.php'),
      },
    },
  },
})


