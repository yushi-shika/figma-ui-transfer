import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FigmaCapture from './FigmaCapture.tsx'

const isCaptureRoute = window.location.pathname === '/figma-capture'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isCaptureRoute ? <FigmaCapture /> : <App />}
  </StrictMode>,
)
