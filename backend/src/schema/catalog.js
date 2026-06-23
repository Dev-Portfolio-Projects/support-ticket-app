import {
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const ticketStatuses = pgTable(
  "ticket_statuses",
  {
    status_id: serial("status_id").primaryKey(),

    status_name: varchar("status_name", {
      length: 50,
    })
      .notNull()
      .unique(),
  }
);

export const ticketPriorities = pgTable(
  "ticket_priorities",
  {
    priority_id: serial("priority_id").primaryKey(),

    priority_name: varchar("priority_name", {
      length: 50,
    })
      .notNull()
      .unique(),

    sla_hours: integer("sla_hours").notNull(),
  }
);

export const categories = pgTable(
  "categories",
  {
    category_id: serial("category_id").primaryKey(),

    name: varchar("name", {
      length: 100,
    }).notNull(),
  }
);