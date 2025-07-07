import { hydrateRoot } from 'react-dom/client'
import App from './App'

/** Hydrate index.html, so App can be interactive (used for SSR) */
hydrateRoot(document.getElementById('root')!, <App />)
