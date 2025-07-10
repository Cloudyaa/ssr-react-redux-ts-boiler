import { createServer } from './api/server';

// start the local server
createServer().then((app) => {
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
