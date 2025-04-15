# AngularSeed

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Project Overview

AngularSeed is a comprehensive starter template for Angular applications, showcasing various features and integration examples:

### Features

1. **Material Design 3 Integration**: Modern UI components following Material Design 3 principles.

2. **Database Demo**: 
   - Demonstrates integration with SQLite using Drizzle ORM
   - Includes sample data models and CRUD operations
   - Server-side and client-side database handling

3. **Cat as a Service (CATAAS) Demo**:
   - Demonstrates server-side rendering (SSR) capabilities
   - Integrates with external APIs (The Cat API)
   - Features:
     - Random cat image generation
     - Cat images with custom text
     - Cat images filtered by tags
   - Showcases Angular Material components in a real-world application

4. **Server-Side Rendering (SSR)**:
   - Angular Universal integration for improved SEO and performance
   - Server-side API proxying for secure external API access

## Project Structure

- `/src/app`: Main application code
  - `/app/cataas`: Cat as a Service demo components and services
- `/projects/db`: Database integration module
  - `/db/src/lib`: Database services, components, and schema definitions
  - `/db/migrations`: SQL migration files

## Development server

To start a local development server, run:

```bash
ng serve
```

For server-side rendering with API support, use:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## API Integration

### The Cat API

The CATAAS demo uses [The Cat API](https://thecatapi.com/) to fetch cat images. The integration:

1. Fetches random cat images
2. Supports filtering by cat breeds (as tags)
3. Simulates adding text to cat images

The API calls are handled through Angular services with proper error handling and fallback mechanisms.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

For a production build with server-side rendering:

```bash
npm run build:ssr
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
