import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Static head tags written by scripts/prerender.ts are for crawlers only;
// drop them before React mounts so SEOHead renders the single live set.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
