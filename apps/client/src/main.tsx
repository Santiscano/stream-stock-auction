import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { ThemeContextProvider } from './theme/index.tsx';
import App from './App.tsx'
import './index.css'
import { LayoutContextProvider } from './context/LayoutContext.tsx';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>

        <ThemeContextProvider>
          <LayoutContextProvider>
            <App />
          </LayoutContextProvider>
        </ThemeContextProvider>

      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
  
)
