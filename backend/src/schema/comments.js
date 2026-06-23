import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
  comment_id: serial("comment_id").primaryKey(),

  ticket_id: integer("ticket_id").notNull(),

  user_id: integer("user_id").notNull(),

  content: text("content").notNull(),

  created_at: timestamp("created_at").defaultNow(),
});