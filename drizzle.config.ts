import type { Config } from 'drizzle-kit';

export default {
  schema: './projects/db/src/lib/schema.ts',
  out: './projects/db/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: 'file:sqlite.db',
  },
} satisfies Config;
