import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";

export const createDb = () => {
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql);
};