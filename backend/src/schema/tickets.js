import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

export const tickets = pgTable("tickets", {
  ticket_id: serial("ticket_id").primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),

  status_id: integer("status_id").notNull(),
  priority_id: integer("priority_id").notNull(),

  requester_id: integer("requester_id").notNull(),
  assigned_to: integer("assigned_to"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});