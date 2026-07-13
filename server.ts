import express from 'express';
import path from 'path';

// Import our serverless handlers
import contactHandler from './api/contact.js';
import recitationsHandler from './api/recitations.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use body-parsers to handle incoming payloads (like base64 audio uploads in recitations)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.text({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Helper/Wrapper to convert Vercel handler to Express middleware
  const makeExpressHandler = (handler: any) => {
    return async (req: express.Request, res: express.Response) => {
      try {
        await handler(req, res);
      } catch (err: any) {
        console.error('API Handler Error:', err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
        }
      }
    };
  };

  // Mount API endpoints
  app.all('/api/contact', makeExpressHandler(contactHandler));
  app.all('/api/recitations', makeExpressHandler(recitationsHandler));

  // Serve Vite / Static files
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('/*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
