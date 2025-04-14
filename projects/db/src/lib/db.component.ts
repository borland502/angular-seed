import { Component, OnInit } from '@angular/core';
import { DbService } from './db.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-db',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="db-demo">
      <h2>Drizzle SQLite Database Demo</h2>

      <div *ngIf="loading">Loading database data...</div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error">
        <h3>Users</h3>
        <div *ngIf="users.length === 0">No users found</div>
        <ul *ngIf="users.length > 0">
          <li *ngFor="let user of users">
            <strong>{{ user.name }}</strong> ({{ user.email }})
          </li>
        </ul>

        <h3>Posts</h3>
        <div *ngIf="posts.length === 0">No posts found</div>
        <div *ngIf="posts.length > 0" class="posts">
          <div *ngFor="let post of posts" class="post">
            <h4>{{ post.title }}</h4>
            <p>{{ post.content }}</p>
            <small>By: {{ getUserName(post.authorId) }}</small>

            <h5>Comments</h5>
            <div *ngIf="getCommentsForPost(post.id).length === 0">No comments</div>
            <ul *ngIf="getCommentsForPost(post.id).length > 0">
              <li *ngFor="let comment of getCommentsForPost(post.id)">
                {{ comment.content }}
                <small>- {{ getUserName(comment.authorId) }}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .db-demo {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .error {
      color: red;
      padding: 10px;
      background-color: #ffeeee;
      border: 1px solid #ffcccc;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .posts {
      display: grid;
      gap: 20px;
    }

    .post {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 4px;
    }

    h2 {
      color: #333;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }

    h3 {
      color: #555;
      margin-top: 20px;
    }

    h4 {
      margin-bottom: 5px;
    }

    ul {
      padding-left: 20px;
    }

    small {
      color: #777;
      font-style: italic;
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
