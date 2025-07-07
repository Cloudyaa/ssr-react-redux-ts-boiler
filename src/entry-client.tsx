import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

/** Get preloaded state from server */
const preloadedState = window.__PRELOADED_STATE__

/** Create store with preloaded state */
const store = configureStore({
  reducer: {},
  preloadedState,
})

/** Allow the passed state to be garbage-collected */
delete window.__PRELOADED_STATE__

/** Hydrate index.html, so App can be interactive (used for SSR) */
hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <App />
  </Provider>
)
