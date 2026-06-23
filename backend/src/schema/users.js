import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),

  full_name: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),

  password_hash: text("password_hash").notNull(),

  role_id: integer("role_id").notNull(),

  reset_token: text("reset_token"),
  reset_token_exp: timestamp("reset_token_exp"),

  created_at: timestamp("created_at").defaultNow(),
});