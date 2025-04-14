export default {
  schema: './projects/db/src/lib/schema.ts',
  out: './projects/db/migrations',
  dialect: 'sqlite',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
};
