import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/schema.ts", // Path to schema files
  out: "./drizzle",  
  dialect: 'postgresql',     // Path to migration folder           // or "better-sqlite3"
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

  