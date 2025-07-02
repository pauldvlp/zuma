import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ['babel-plugin-react-compiler', { target: '19' }]
      ]
    }
  }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src')
    }
  }
})
