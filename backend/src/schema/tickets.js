import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const tickets = pgTable("tickets", {
  ticket_id: serial("ticket_id").primaryKey(),

  requester_id: integer("requester_id").notNull(),

  assigned_to: integer("assigned_to"),

  status_id: integer("status_id").notNull(),

  priority_id: integer("priority_id").notNull(),

  category_id: integer("category_id").notNull(),

  title: varchar("title", {
    length: 200,
  }).notNull(),

  description: text("description").notNull(),

  created_at: timestamp("created_at").defaultNow(),

  updated_at: timestamp("updated_at").defaultNow(),

  resolved_at: timestamp("resolved_at"),

  closed_at: timestamp("closed_at"),
});