import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const audit_logs = pgTable("audit_logs", {
  log_id: serial("log_id").primaryKey(),

  user_id: integer("user_id").notNull(),

  action: text("action").notNull(),

  entity: text("entity").notNull(),

  entity_id: integer("entity_id"),

  metadata: text("metadata"),

  created_at: timestamp("created_at").defaultNow(),
});