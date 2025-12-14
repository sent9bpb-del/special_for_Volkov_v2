import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // доступен по сети
    port: 5173,
    open: true, // автоматически открывать браузер
    strictPort: false, // если порт занят, попробует другой
  },
})
