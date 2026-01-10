import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  base: '/ESW_config_generator/',   // <= вот это
  plugins: [react(), WindiCSS()],
})