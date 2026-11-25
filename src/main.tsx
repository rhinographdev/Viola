import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/playfair-display/400-italic.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'
import { initSmoothScroll } from './hooks/smoothScroll'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
document.documentElement.classList.add('app-ready')
initSmoothScroll()
