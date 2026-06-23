import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  role_id: serial("role_id").primaryKey(),

  role_name: varchar("role_name", {
    length: 50,
  })
    .notNull()
    .unique(),
});