import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import 'leaflet/dist/leaflet.css';
import './index.css';

// Safely suppress benign third-party cross-origin script errors (e.g. AdSense, Clarity, Disqus)
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    (window as any).__deferredInstallPrompt = e;
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  window.addEventListener('error', (event) => {
    if (event.message === 'Script error.' || !event.filename || event.filename.includes('googlesyndication') || event.filename.includes('clarity') || event.filename.includes('disqus')) {
      // Benign third-party cross-origin error
      event.preventDefault();
      return true;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason ? String(event.reason) : '';
    if (reason.includes('adsbygoogle') || reason.includes('disqus') || reason.includes('clarity')) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);


