import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

console.log("DATABASE_URL:", process.env.DATABASE_URL);
