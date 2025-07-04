import { App } from '@/App'
import '@/index.css'
import '@/styles/hugeicons.css'
import '@fontsource-variable/bricolage-grotesque/index.css'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <ThemeProvider enableSystem={false}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
