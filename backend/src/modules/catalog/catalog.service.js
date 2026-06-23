import { db } from "../../db/index.js";

import {
  ticketStatuses,
  ticketPriorities,
  categories,
} from "../../schema/catalog.js";

export const createStatus = async (data) => {
  const result = await db
    .insert(ticketStatuses)
    .values(data)
    .returning();

  return result[0];
};

export const createPriority = async (data) => {
  const result = await db
    .insert(ticketPriorities)
    .values(data)
    .returning();

  return result[0];
};

export const createCategory = async (data) => {
  const result = await db
    .insert(categories)
    .values(data)
    .returning();

  return result[0];
};

export const getStatuses = () =>
  db.select().from(ticketStatuses);

export const getPriorities = () =>
  db.select().from(ticketPriorities);

export const getCategories = () =>
  db.select().from(categories);