import { renderToString } from 'react-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

/** Function that will render App to HTML (used for SSR) */
export function render() {
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Get the initial state to send to client
  const preloadedState = store.getState()

  return { html, preloadedState }
}
