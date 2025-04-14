import { createClient, Client } from '@libsql/client';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Determine if we're running in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Database file path - using a local SQLite file
const DB_PATH = 'sqlite.db';

// Create a client connection to the SQLite database (only used in Node.js)
let clientInstance: Client | null = null;

if (!isBrowser) {
  clientInstance = createClient({
    url: `file:${DB_PATH}`,
  });
}

export const client = clientInstance;

// Create a Drizzle ORM instance with our schema (only used in Node.js)
let dbInstance: LibSQLDatabase<typeof schema> | null = null;

if (!isBrowser && client) {
  dbInstance = drizzle(client, { schema });
}

export const db = dbInstance;

// Export mock data for browser environment
export const mockData = {
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com', createdAt: new Date() },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date() }
  ],
  posts: [
    {
      id: '1',
      title: 'Getting Started with Drizzle ORM',
      content: 'Drizzle ORM is a TypeScript ORM for SQL databases designed with maximum type safety in mind.',
      authorId: '1',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Building Angular Apps with SQLite',
      content: 'Learn how to integrate SQLite with your Angular applications for local data storage.',
      authorId: '1',
      createdAt: new Date()
    }
  ],
  comments: [
    {
      id: '1',
      content: 'Great introduction to Drizzle!',
      postId: '1',
      authorId: '2',
      createdAt: new Date()
    },
    {
      id: '2',
      content: 'This helped me understand how to use SQLite with Angular.',
      postId: '2',
      authorId: '2',
      createdAt: new Date()
    }
  ]
};

// Export a function to initialize the database
export async function initializeDb() {
  console.log('Initializing database connection...');

  try {
    if (isBrowser) {
      console.log('Running in browser environment, using mock data');
      return true;
    }

    if (!client) {
      console.error('Client is not initialized');
      return false;
    }

    // Test the connection (only in Node.js environment)
    await client.execute('SELECT 1');

    // Check if tables exist
    const result = await client.execute(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name='users'
    `);

    if (result.rows.length === 0) {
      console.warn('Database tables not found. Please run migrations first with: npm run db:migrate');
    } else {
      console.log('Database connection successful and tables exist');
    }

    return true;
  } catch (error: any) {
    console.error('Database connection failed:', error);
    if (error.stack) {
      console.error(error.stack);
    }
    return false;
  }
}
