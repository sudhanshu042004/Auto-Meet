import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("db url not defined")
  }
  const client = postgres(process.env.DATABASE_URL!)
  const db = drizzle(client );
}

main();
