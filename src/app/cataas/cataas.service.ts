import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export interface CatImage {
  url: string;
  id: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CataasService {
  // Using The Cat API instead of CATAAS
  private apiUrl = 'https://api.thecatapi.com/v1';
  private platformId = inject(PLATFORM_ID);

  // Sample cat breeds to use as tags
  private catBreeds = [
    'Abyssinian', 'Bengal', 'Birman', 'Bombay', 'British Shorthair',
    'Egyptian Mau', 'Maine Coon', 'Persian', 'Ragdoll', 'Siamese',
    'Sphynx', 'Scottish Fold', 'American Shorthair', 'Exotic Shorthair'
  ];

  constructor(private http: HttpClient) {}

  /**
   * Get a random cat image
   */
  getRandomCat(): Observable<CatImage> {
    return this.http.get<any[]>(`${this.apiUrl}/images/search`).pipe(
      map(response => {
        const cat = response[0];
        return {
          url: cat.url,
          id: cat.id,
          tags: cat.breeds?.map((breed: any) => breed.name) || ['random']
        };
      }),
      catchError(error => {
        console.error('Error fetching random cat:', error);
        return of(this.getFallbackCat());
      })
    );
  }

  /**
   * Get a cat image with specific tags (using breeds as tags)
   */
  getCatWithTags(tags: string[]): Observable<CatImage> {
    // For demo purposes, we'll just get a random cat since we can't filter by tags directly
    return this.getRandomCat().pipe(
      map(cat => {
        // Add the selected tags to the cat
        return {
          ...cat,
          tags: [...tags]
        };
      })
    );
  }

  /**
   * Get a cat image with text
   * Note: The Cat API doesn't support adding text to images directly,
   * so we'll use a random cat image and pretend it has text
   */
  getCatWithText(text: string, color: string = 'white', size: number = 50): Observable<CatImage> {
    return this.getRandomCat().pipe(
      map(cat => {
        // For demo purposes, we'll just return the cat and pretend it has text
        return {
          ...cat,
          tags: [...cat.tags, 'text', text]
        };
      })
    );
  }

  /**
   * Get available tags (using cat breeds as tags)
   */
  getAvailableTags(): Observable<string[]> {
    return of(this.catBreeds);
  }

  /**
   * Fallback cat for error cases
   */
  private getFallbackCat(): CatImage {
    return {
      url: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
      id: 'fallback',
      tags: ['fallback']
    };
  }

  /**
   * Check if we're running on the server
   */
  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}
