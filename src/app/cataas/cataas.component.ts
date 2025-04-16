import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { CataasService, CatImage } from './cataas.service';

@Component({
  selector: 'app-cataas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="cataas-container">
      <mat-tab-group animationDuration="300ms">
        <!-- Random Cat Tab -->
        <mat-tab label="Random Cat">
          <div class="tab-content">
            <div class="cat-card md-elevation-2 md-rounded-medium">
              <div class="cat-image-container">
                <div *ngIf="loading" class="loading-overlay">
                  <mat-spinner diameter="40"></mat-spinner>
                </div>
                <img *ngIf="currentCat" [src]="currentCat.url" alt="Random Cat" class="cat-image"
                     [class.loading]="loading" (load)="onImageLoad()" (error)="onImageError()">
              </div>

              <div class="cat-info">
                <div *ngIf="currentCat && currentCat.tags.length > 0" class="cat-tags">
                  <mat-chip-set>
                    <mat-chip *ngFor="let tag of currentCat.tags">{{ tag }}</mat-chip>
                  </mat-chip-set>
                </div>

                <div class="cat-actions">
                  <button mat-raised-button color="primary" (click)="getRandomCat()" [disabled]="loading">
                    <mat-icon>refresh</mat-icon> New Cat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Cat with Text Tab -->
        <mat-tab label="Cat with Text">
          <div class="tab-content">
            <div class="cat-card md-elevation-2 md-rounded-medium">
              <div class="cat-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Text</mat-label>
                  <input matInput [(ngModel)]="catText" placeholder="Enter text for the cat">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Text Color</mat-label>
                  <mat-select [(ngModel)]="textColor">
                    <mat-option value="white">White</mat-option>
                    <mat-option value="black">Black</mat-option>
                    <mat-option value="red">Red</mat-option>
                    <mat-option value="green">Green</mat-option>
                    <mat-option value="blue">Blue</mat-option>
                    <mat-option value="yellow">Yellow</mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-raised-button color="primary" (click)="getCatWithText()" [disabled]="loading || !catText">
                  <mat-icon>text_fields</mat-icon> Generate Cat
                </button>
              </div>

              <mat-divider></mat-divider>

              <div class="cat-image-container">
                <div *ngIf="loading" class="loading-overlay">
                  <mat-spinner diameter="40"></mat-spinner>
                </div>
                <img *ngIf="currentCat" [src]="currentCat.url" alt="Cat with Text" class="cat-image"
                     [class.loading]="loading" (load)="onImageLoad()" (error)="onImageError()">
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Cat with Tags Tab -->
        <mat-tab label="Cat with Tags">
          <div class="tab-content">
            <div class="cat-card md-elevation-2 md-rounded-medium">
              <div class="cat-form">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Tags</mat-label>
                  <mat-select [(ngModel)]="selectedTags" multiple>
                    <mat-option *ngFor="let tag of availableTags" [value]="tag">{{ tag }}</mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-raised-button color="primary" (click)="getCatWithTags()" [disabled]="loading || selectedTags.length === 0">
                  <mat-icon>label</mat-icon> Find Cat
                </button>
              </div>

              <mat-divider></mat-divider>

              <div class="cat-image-container">
                <div *ngIf="loading" class="loading-overlay">
                  <mat-spinner diameter="40"></mat-spinner>
                </div>
                <img *ngIf="currentCat" [src]="currentCat.url" alt="Cat with Tags" class="cat-image"
                     [class.loading]="loading" (load)="onImageLoad()" (error)="onImageError()">
              </div>

              <div *ngIf="currentCat && currentCat.tags.length > 0" class="cat-tags">
                <mat-chip-set>
                  <mat-chip *ngFor="let tag of currentCat.tags">{{ tag }}</mat-chip>
                </mat-chip-set>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .cataas-container {
      width: 100%;
    }

    .tab-content {
      padding: var(--md-sys-spacing-4) 0;
    }

    .cat-card {
      background-color: var(--md-sys-color-surface);
      padding: var(--md-sys-spacing-4);
      margin-bottom: var(--md-sys-spacing-4);
    }

    .cat-image-container {
      position: relative;
      width: 100%;
      height: 300px;
      overflow: hidden;
      border-radius: 8px;
      background-color: var(--md-sys-color-surface-variant);
      margin: var(--md-sys-spacing-4) 0;
    }

    .cat-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }

    .cat-image.loading {
      opacity: 0.5;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 1;
    }

    .cat-info {
      display: flex;
      flex-direction: column;
      gap: var(--md-sys-spacing-3);
    }

    .cat-tags {
      margin: var(--md-sys-spacing-2) 0;
    }

    .cat-actions {
      display: flex;
      justify-content: center;
      margin-top: var(--md-sys-spacing-2);
    }

    .cat-form {
      display: flex;
      flex-wrap: wrap;
      gap: var(--md-sys-spacing-3);
      align-items: center;
      margin-bottom: var(--md-sys-spacing-3);
    }

    .full-width {
      flex: 1;
    }

    mat-divider {
      margin: var(--md-sys-spacing-3) 0;
    }
  `]
})
export class CataasComponent implements OnInit {
  private cataasService = inject(CataasService);
  private snackBar = inject(MatSnackBar);

  // Cat state
  currentCat: CatImage | null = null;
  loading = true;

  // Form values
  catText = 'Hello World';
  textColor = 'white';
  selectedTags: string[] = [];
  availableTags: string[] = ['cute', 'funny', 'sleepy', 'angry', 'happy'];

  ngOnInit() {
    // Load available tags
    this.cataasService.getAvailableTags().subscribe({
      next: (tags) => {
        if (tags && tags.length > 0) {
          this.availableTags = tags;
        }
      },
      error: (err) => {
        console.error('Failed to load tags, using default tags:', err);
        // Use default tags if API fails
        this.availableTags = ['cute', 'funny', 'sleepy', 'angry', 'happy'];
      }
    });

    // Get initial random cat
    this.getRandomCat();
  }

  getRandomCat() {
    this.loading = true;
    this.cataasService.getRandomCat().subscribe({
      next: (cat) => {
        this.currentCat = cat;
      },
      error: (err) => {
        this.handleError('Failed to load random cat');
      }
    });
  }

  getCatWithText() {
    if (!this.catText) {
      this.snackBar.open('Please enter some text', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.cataasService.getCatWithText(this.catText, this.textColor).subscribe({
      next: (cat) => {
        this.currentCat = cat;
      },
      error: (err) => {
        this.handleError('Failed to load cat with text');
      }
    });
  }

  getCatWithTags() {
    if (!this.selectedTags || this.selectedTags.length === 0) {
      this.snackBar.open('Please select at least one tag', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.cataasService.getCatWithTags(this.selectedTags).subscribe({
      next: (cat) => {
        this.currentCat = cat;
      },
      error: (err) => {
        this.handleError('Failed to load cat with tags');
      }
    });
  }

  onImageLoad() {
    this.loading = false;
  }

  onImageError() {
    this.loading = false;
    this.handleError('Failed to load cat image');
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
}
