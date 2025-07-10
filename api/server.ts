import { readFile } from 'node:fs/promises';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let app: express.Application;

export async function createServer() {
  // avoid recreating the Vite server on every request
  if (app) return app;

  app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.
  app.use(vite.middlewares);

  app.use('*all', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = await readFile('./index.html', 'utf-8');

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

      // 4. render the app HTML. This assumes entry-server.tsx's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const { html, preloadedState } = await render(url);

      // 5. Inject both HTML and Redux state
      const finalHtml = template
        .replace(`<!--ssr-outlet-->`, html)
        .replace(
          `<!--redux-state-->`,
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`,
        );

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  return app;
}

// Export for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await createServer();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
