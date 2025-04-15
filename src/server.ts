import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * CATAAS API proxy endpoints
 */

// Define types for CATAAS API responses
interface CataasResponse {
  _id: string;
  url: string;
  tags?: string[];
  [key: string]: any;
}

interface CatImage {
  url: string;
  id: string;
  tags: string[];
}

// Base CATAAS API URL
const CATAAS_API_URL = 'https://cataas.com';

// Proxy endpoint for random cat
app.get('/api/cats/random', async (req, res) => {
  try {
    console.log('Fetching random cat from CATAAS API...');
    const response = await fetch(`${CATAAS_API_URL}/cat?json=true`);

    if (!response.ok) {
      throw new Error(`CATAAS API responded with status: ${response.status}`);
    }

    const data = await response.json() as CataasResponse;
    console.log('Random cat data received:', data);

    // Transform the response to include the full URL
    const result: CatImage = {
      url: `${CATAAS_API_URL}${data.url}`,
      id: data._id,
      tags: data.tags || []
    };

    console.log('Sending cat data to client:', result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching random cat:', error);
    res.status(500).json({ error: 'Failed to fetch cat from CATAAS API', details: String(error) });
  }
});

// Proxy endpoint for cat with tags
app.get('/api/cats/tags/:tags', async (req, res) => {
  try {
    console.log(`Fetching cat with tags ${req.params.tags} from CATAAS API...`);
    const tags = req.params.tags;
    const response = await fetch(`${CATAAS_API_URL}/cat/${tags}?json=true`);

    if (!response.ok) {
      throw new Error(`CATAAS API responded with status: ${response.status}`);
    }

    const data = await response.json() as CataasResponse;
    console.log('Cat with tags data received:', data);

    // Transform the response to include the full URL
    const result: CatImage = {
      url: `${CATAAS_API_URL}${data.url}`,
      id: data._id,
      tags: data.tags || []
    };

    console.log('Sending cat data to client:', result);
    res.json(result);
  } catch (error) {
    console.error(`Error fetching cat with tags ${req.params.tags}:`, error);
    res.status(500).json({ error: 'Failed to fetch cat from CATAAS API', details: String(error) });
  }
});

// Proxy endpoint for cat with text
app.get('/api/cats/says/:text', async (req, res) => {
  try {
    console.log(`Fetching cat with text "${req.params.text}" from CATAAS API...`);
    const text = req.params.text;
    const color = req.query['color'] as string || 'white';
    const size = parseInt(req.query['size'] as string || '50');

    const response = await fetch(`${CATAAS_API_URL}/cat/says/${text}?color=${color}&size=${size}&json=true`);

    if (!response.ok) {
      throw new Error(`CATAAS API responded with status: ${response.status}`);
    }

    const data = await response.json() as CataasResponse;
    console.log('Cat with text data received:', data);

    // Transform the response to include the full URL
    const result: CatImage = {
      url: `${CATAAS_API_URL}${data.url}`,
      id: data._id,
      tags: data.tags || []
    };

    console.log('Sending cat data to client:', result);
    res.json(result);
  } catch (error) {
    console.error(`Error fetching cat with text "${req.params.text}":`, error);
    res.status(500).json({ error: 'Failed to fetch cat from CATAAS API', details: String(error) });
  }
});

// Proxy endpoint for available tags
app.get('/api/cats/tags', async (req, res) => {
  try {
    console.log('Fetching available tags from CATAAS API...');
    const response = await fetch(`${CATAAS_API_URL}/api/tags`);

    if (!response.ok) {
      throw new Error(`CATAAS API responded with status: ${response.status}`);
    }

    const data = await response.json() as string[];
    console.log(`Received ${data.length} tags from CATAAS API`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags from CATAAS API', details: String(error) });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
