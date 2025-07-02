import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { version } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
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
