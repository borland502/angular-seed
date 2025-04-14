import { Component, OnInit } from '@angular/core';
import { DbService } from './db.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'lib-db',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule
  ],
  template: `
    <div class="db-demo">
      <!-- Loading state -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
        <p>Loading database data...</p>
      </div>

      <!-- Error state -->
      <div *ngIf="error" class="error-container md-rounded-medium">
        <mat-icon color="warn">error</mat-icon>
        <p>{{ error }}</p>
      </div>

      <!-- Data display -->
      <div *ngIf="!loading && !error">
        <mat-tab-group animationDuration="300ms">
          <!-- Users Tab -->
          <mat-tab label="Users">
            <div class="tab-content">
              <div *ngIf="users.length === 0" class="empty-state">
                <mat-icon>person_off</mat-icon>
                <p>No users found</p>
              </div>

              <mat-list *ngIf="users.length > 0">
                <mat-list-item *ngFor="let user of users">
                  <mat-icon matListItemIcon>person</mat-icon>
                  <div matListItemTitle>{{ user.name }}</div>
                  <div matListItemLine>{{ user.email }}</div>
                </mat-list-item>
              </mat-list>
            </div>
          </mat-tab>

          <!-- Posts Tab -->
          <mat-tab label="Posts">
            <div class="tab-content">
              <div *ngIf="posts.length === 0" class="empty-state">
                <mat-icon>article</mat-icon>
                <p>No posts found</p>
              </div>

              <div *ngIf="posts.length > 0" class="posts-container">
                <mat-accordion>
                  <mat-expansion-panel *ngFor="let post of posts" class="md-elevation-1 md-rounded-medium">
                    <mat-expansion-panel-header>
                      <mat-panel-title>{{ post.title }}</mat-panel-title>
                      <mat-panel-description>
                        By: {{ getUserName(post.authorId) }}
                      </mat-panel-description>
                    </mat-expansion-panel-header>

                    <p class="post-content">{{ post.content }}</p>
                    <mat-divider></mat-divider>

                    <div class="comments-section">
                      <h3>Comments</h3>
                      <div *ngIf="getCommentsForPost(post.id).length === 0" class="empty-comments">
                        <p>No comments yet</p>
                      </div>

                      <mat-list *ngIf="getCommentsForPost(post.id).length > 0">
                        <mat-list-item *ngFor="let comment of getCommentsForPost(post.id)">
                          <mat-icon matListItemIcon>comment</mat-icon>
                          <div matListItemTitle>{{ comment.content }}</div>
                          <div matListItemLine>By: {{ getUserName(comment.authorId) }}</div>
                        </mat-list-item>
                      </mat-list>
                    </div>
                  </mat-expansion-panel>
                </mat-accordion>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .db-demo {
      width: 100%;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--md-sys-spacing-6);
    }

    .loading-container p {
      margin-top: var(--md-sys-spacing-4);
      color: var(--md-sys-color-on-surface-variant);
    }

    .error-container {
      display: flex;
      align-items: center;
      padding: var(--md-sys-spacing-4);
      background-color: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      margin-bottom: var(--md-sys-spacing-4);
    }

    .error-container mat-icon {
      margin-right: var(--md-sys-spacing-3);
    }

    .tab-content {
      padding: var(--md-sys-spacing-4) 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--md-sys-spacing-8) 0;
      color: var(--md-sys-color-on-surface-variant);
    }

    .empty-state mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: var(--md-sys-spacing-4);
    }

    .posts-container {
      margin-top: var(--md-sys-spacing-4);
    }

    .post-content {
      margin: var(--md-sys-spacing-4) 0;
      white-space: pre-line;
    }

    .comments-section {
      margin-top: var(--md-sys-spacing-4);
    }

    .comments-section h3 {
      margin-bottom: var(--md-sys-spacing-2);
      color: var(--md-sys-color-on-surface-variant);
    }

    .empty-comments {
      padding: var(--md-sys-spacing-2);
      color: var(--md-sys-color-on-surface-variant);
      font-style: italic;
    }

    mat-expansion-panel {
      margin-bottom: var(--md-sys-spacing-3);
    }
  `]
})
export class DbComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dbService: DbService) {}

  async ngOnInit() {
    try {
      // Initialize the database
      await this.dbService.initialize();

      // Load data
      this.users = await this.dbService.getAllUsers();
      this.posts = await this.dbService.getAllPosts();

      // Load comments for each post
      for (const post of this.posts) {
        const postComments = await this.dbService.getCommentsForPost(post.id);
        this.comments.push(...postComments);
      }

      this.loading = false;
    } catch (error) {
      this.error = 'Failed to load database data. See console for details.';
      console.error('Database error:', error);
      this.loading = false;
    }
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }

  getCommentsForPost(postId: string): any[] {
    return this.comments.filter(comment => comment.postId === postId);
  }
}
