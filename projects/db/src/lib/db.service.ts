import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { db, initializeDb, isBrowser, mockData } from './db-connection';
import { users, posts, comments } from './schema';
import { eq } from 'drizzle-orm';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private initialized = false;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the database connection
   */
  async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    this.initialized = await initializeDb();
    return this.initialized;
  }

  /**
   * User operations
   */
  async createUser(name: string, email: string): Promise<string> {
    const id = uuidv4();

    if (isBrowser) {
      // In browser, just add to mock data
      mockData.users.push({
        id,
        name,
        email,
        createdAt: new Date()
      });
    } else {
      // In Node.js, use the database
      await db?.insert(users).values({
        id,
        name,
        email
      });
    }

    return id;
  }

  async getUser(id: string) {
    if (isBrowser) {
      return mockData.users.find(user => user.id === id) || null;
    } else {
      const result = await db?.select().from(users).where(eq(users.id, id));
      return result?.[0] || null;
    }
  }

  async getAllUsers() {
    if (isBrowser) {
      return [...mockData.users];
    } else {
      return await db?.select().from(users) || [];
    }
  }

  /**
   * Post operations
   */
  async createPost(title: string, content: string, authorId: string): Promise<string> {
    const id = uuidv4();

    if (isBrowser) {
      // In browser, just add to mock data
      mockData.posts.push({
        id,
        title,
        content,
        authorId,
        createdAt: new Date()
      });
    } else {
      // In Node.js, use the database
      await db?.insert(posts).values({
        id,
        title,
        content,
        authorId
      });
    }

    return id;
  }

  async getPost(id: string) {
    if (isBrowser) {
      return mockData.posts.find(post => post.id === id) || null;
    } else {
      const result = await db?.select().from(posts).where(eq(posts.id, id));
      return result?.[0] || null;
    }
  }

  async getAllPosts() {
    if (isBrowser) {
      return [...mockData.posts];
    } else {
      return await db?.select().from(posts) || [];
    }
  }

  async getPostsByAuthor(authorId: string) {
    if (isBrowser) {
      return mockData.posts.filter(post => post.authorId === authorId);
    } else {
      return await db?.select().from(posts).where(eq(posts.authorId, authorId)) || [];
    }
  }

  /**
   * Comment operations
   */
  async createComment(content: string, postId: string, authorId: string): Promise<string> {
    const id = uuidv4();

    if (isBrowser) {
      // In browser, just add to mock data
      mockData.comments.push({
        id,
        content,
        postId,
        authorId,
        createdAt: new Date()
      });
    } else {
      // In Node.js, use the database
      await db?.insert(comments).values({
        id,
        content,
        postId,
        authorId
      });
    }

    return id;
  }

  async getCommentsForPost(postId: string) {
    if (isBrowser) {
      return mockData.comments.filter(comment => comment.postId === postId);
    } else {
      return await db?.select().from(comments).where(eq(comments.postId, postId)) || [];
    }
  }
}
