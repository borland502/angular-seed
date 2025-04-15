# Server-Side Rendering (SSR) with Angular Universal

This directory contains the server-side rendering implementation for the Angular Seed project.

## Overview

The server-side rendering functionality:

1. Improves initial page load performance
2. Enhances SEO by making content available to search engine crawlers
3. Provides API proxy capabilities for secure external API access
4. Enables server-side data fetching

## Key Files

### server.ts

The main server file that:

- Sets up the Express server
- Configures Angular Universal for server-side rendering
- Implements API proxy endpoints for The Cat API
- Handles static file serving
- Manages server-side request handling

## API Proxy Endpoints

The server implements several proxy endpoints to communicate with external APIs:

### Cat API Endpoints

- `/api/cats/random`: Fetches a random cat image
- `/api/cats/tags/:tags`: Fetches a cat image with specific tags
- `/api/cats/says/:text`: Fetches a cat image with custom text
- `/api/cats/tags`: Fetches available tags/categories

## Error Handling

The server includes robust error handling:

- Proper HTTP status codes for different error scenarios
- Detailed error messages for debugging
- Fallback mechanisms for API failures

## Running the Server

To run the server with SSR enabled:

```bash
npm start
```

This will:
1. Build the Angular application
2. Compile the server code
3. Start the Express server with SSR enabled

## Development vs. Production

In development mode, the server provides:
- Hot module replacement
- Detailed error messages
- Development-specific configurations

In production mode, the server optimizes for:
- Performance
- Security
- Reduced verbosity in logs

## Extending the Server

To add new API endpoints:

1. Define the endpoint in `server.ts`
2. Implement the request handler
3. Add appropriate error handling
4. Document the new endpoint

Example:

```typescript
// New API endpoint
app.get('/api/new-endpoint', async (req, res) => {
  try {
    // Implementation
    res.json({ result: 'success' });
  } catch (error) {
    console.error('Error in new endpoint:', error);
    res.status(500).json({ error: 'Failed to process request', details: String(error) });
  }
});
```
# Server-Side Rendering (SSR) with Angular Universal

This directory contains the server-side rendering implementation for the Angular Seed project.

## Overview

The server-side rendering functionality:

1. Improves initial page load performance
2. Enhances SEO by making content available to search engine crawlers
3. Provides API proxy capabilities for secure external API access
4. Enables server-side data fetching

## Key Files

### server.ts

The main server file that:

- Sets up the Express server
- Configures Angular Universal for server-side rendering
- Implements API proxy endpoints for The Cat API
- Handles static file serving
- Manages server-side request handling

## API Proxy Endpoints

The server implements several proxy endpoints to communicate with external APIs:

### Cat API Endpoints

- `/api/cats/random`: Fetches a random cat image
- `/api/cats/tags/:tags`: Fetches a cat image with specific tags
- `/api/cats/says/:text`: Fetches a cat image with custom text
- `/api/cats/tags`: Fetches available tags/categories

## Error Handling

The server includes robust error handling:

- Proper HTTP status codes for different error scenarios
- Detailed error messages for debugging
- Fallback mechanisms for API failures

## Running the Server

To run the server with SSR enabled:

```bash
npm start
```

This will:
1. Build the Angular application
2. Compile the server code
3. Start the Express server with SSR enabled

## Development vs. Production

In development mode, the server provides:
- Hot module replacement
- Detailed error messages
- Development-specific configurations

In production mode, the server optimizes for:
- Performance
- Security
- Reduced verbosity in logs

## Extending the Server

To add new API endpoints:

1. Define the endpoint in `server.ts`
2. Implement the request handler
3. Add appropriate error handling
4. Document the new endpoint

Example:

```typescript
// New API endpoint
app.get('/api/new-endpoint', async (req, res) => {
  try {
    // Implementation
    res.json({ result: 'success' });
  } catch (error) {
    console.error('Error in new endpoint:', error);
    res.status(500).json({ error: 'Failed to process request', details: String(error) });
  }
# Server-Side Rendering (SSR) with Angular Universal

This directory contains the server-side rendering implementation for the Angular Seed project.

## Overview

The server-side rendering functionality:

1. Improves initial page load performance
2. Enhances SEO by making content available to search engine crawlers
3. Provides API proxy capabilities for secure external API access
4. Enables server-side data fetching

## Key Files

### server.ts

The main server file that:

- Sets up the Express server
- Configures Angular Universal for server-side rendering
- Implements API proxy endpoints for The Cat API
- Handles static file serving
- Manages server-side request handling

## API Proxy Endpoints

The server implements several proxy endpoints to communicate with external APIs:

### Cat API Endpoints

- `/api/cats/random`: Fetches a random cat image
- `/api/cats/tags/:tags`: Fetches a cat image with specific tags
- `/api/cats/says/:text`: Fetches a cat image with custom text
- `/api/cats/tags`: Fetches available tags/categories

## Error Handling

The server includes robust error handling:

- Proper HTTP status codes for different error scenarios
- Detailed error messages for debugging
- Fallback mechanisms for API failures

## Running the Server

To run the server with SSR enabled:

```bash
npm start
```

This will:
1. Build the Angular application
2. Compile the server code
3. Start the Express server with SSR enabled

## Development vs. Production

In development mode, the server provides:
- Hot module replacement
- Detailed error messages
- Development-specific configurations

In production mode, the server optimizes for:
- Performance
- Security
- Reduced verbosity in logs

## Extending the Server

To add new API endpoints:

1. Define the endpoint in `server.ts`
2. Implement the request handler
3. Add appropriate error handling
4. Document the new endpoint

Example:

```typescript
// New API endpoint
app.get('/api/new-endpoint', async (req, res) => {
  try {
    // Implementation
    res.json({ result: 'success' });
  } catch (error) {
    console.error('Error in new endpoint:', error);
    res.status(500).json({ error: 'Failed to process request', details: String(error) });
  }
});
