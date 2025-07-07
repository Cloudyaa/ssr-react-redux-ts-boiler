import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createRouter } from './router';
import { RouterProvider } from 'react-router-dom';

/** Get preloaded state from server */
const preloadedState = window.__PRELOADED_STATE__;

/** Create router */
const router = createRouter();

/** Create store with preloaded state */
const store = configureStore({
  reducer: {},
  preloadedState,
});

/** Allow the passed state to be garbage-collected */
delete window.__PRELOADED_STATE__;

/** Hydrate index.html, so App can be interactive (used for SSR) */
hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
