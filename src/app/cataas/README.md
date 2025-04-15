# Cat as a Service (CATAAS) Demo

This module demonstrates server-side rendering (SSR) capabilities in Angular by integrating with The Cat API to display cat images.

## Overview

The CATAAS demo showcases:

1. Server-side rendering with Angular Universal
2. Integration with external APIs
3. Material Design 3 components in a real-world application
4. Reactive programming with RxJS

## Components

### CataasComponent (`cataas.component.ts`)

The main component that displays the cat images and provides user interaction:

- Tab-based interface for different cat image options
- Random cat image generation
- Cat images with custom text
- Cat images filtered by tags/breeds
- Error handling with fallback images
- Loading indicators

### CataasService (`cataas.service.ts`)

Service that handles API communication with The Cat API:

- Fetches random cat images
- Retrieves available cat breeds as tags
- Handles errors with fallback mechanisms
- Provides typed interfaces for API responses

## API Integration

This demo uses [The Cat API](https://thecatapi.com/) to fetch cat images. The integration:

1. Fetches random cat images
2. Supports filtering by cat breeds (as tags)
3. Simulates adding text to cat images

## Usage

To use this component in another part of the application:

```typescript
import { CataasComponent } from './cataas/cataas.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CataasComponent],
  template: `
    <app-cataas></app-cataas>
  `
})
export class ExampleComponent {}
```

## Server-Side Rendering

The component is designed to work with Angular's server-side rendering. The server.ts file includes proxy endpoints that communicate with The Cat API, allowing the application to:

1. Fetch data during server-side rendering
2. Improve SEO by having content available on initial page load
3. Provide a better user experience with faster initial rendering

## Error Handling

The component includes comprehensive error handling:

- Fallback images when API requests fail
- Default tags when tag fetching fails
- Loading indicators during API requests
- User-friendly error messages
