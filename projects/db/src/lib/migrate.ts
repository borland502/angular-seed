import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { readFileSync } from 'fs';
import { join } from 'path';

// Database file path
const DB_PATH = 'sqlite.db';

// Main migration function
async function main() {
  console.log('Starting database migration...');

  try {
    // Create a client connection to the SQLite database
    const client = createClient({
      url: `file:${DB_PATH}`,
    });

    // Read the SQL schema file
    const schemaPath = join(process.cwd(), 'projects', 'db', 'migrations', 'schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf8');

    // Execute the SQL schema
    console.log('Running migrations from SQL file...');
    const statements = schemaSql.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await client.execute(statement + ';');
      }
    }

    console.log('Migrations completed successfully');

    // Create a Drizzle ORM instance with our schema
    const db = drizzle(client, { schema });

    // Seed the database with sample data if needed
    await seedDatabase(db);

    // Close the client connection
    await client.close();

    console.log('Database setup completed successfully');
  } catch (error: any) {
    console.error('Migration failed:', error);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Function to seed the database with sample data
async function seedDatabase(db: any) {
  console.log('Seeding database with sample data...');

  try {
    // Check if we already have users
    const existingUsers = await db.select().from(schema.users);

    if (existingUsers.length === 0) {
      console.log('Adding sample data...');

      // Add a sample user
      const userId = crypto.randomUUID();
      await db.insert(schema.users).values({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com'
      });

      // Add sample posts
      const postId1 = crypto.randomUUID();
      const postId2 = crypto.randomUUID();

      await db.insert(schema.posts).values([
        {
          id: postId1,
          title: 'Getting Started with Drizzle ORM',
          content: 'Drizzle ORM is a TypeScript ORM for SQL databases designed with maximum type safety in mind.',
          authorId: userId
        },
        {
          id: postId2,
          title: 'Building Angular Apps with SQLite',
          content: 'Learn how to integrate SQLite with your Angular applications for local data storage.',
          authorId: userId
        }
      ]);

      // Add sample comments
      await db.insert(schema.comments).values([
        {
          id: crypto.randomUUID(),
          content: 'Great introduction to Drizzle!',
          postId: postId1,
          authorId: userId
        },
        {
          id: crypto.randomUUID(),
          content: 'This helped me understand how to use SQLite with Angular.',
          postId: postId2,
          authorId: userId
        }
      ]);

      console.log('Sample data added successfully');
    } else {
      console.log('Database already contains data, skipping seed');
    }
  } catch (error: any) {
    console.error('Error seeding database:', error);
    if (error.stack) {
      console.error(error.stack);
    }
    // Continue execution even if seeding fails
  }
}

// Run the main function
main();
