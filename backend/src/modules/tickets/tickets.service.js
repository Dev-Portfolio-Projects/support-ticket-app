import { db } from "../../db/index.js";
import { tickets } from "../../schema/tickets.js";
import { eq } from "drizzle-orm";

export const createTicket = async (data) => {
  const result = await db
    .insert(tickets)
    .values(data)
    .returning();

  return result[0];
};

export const getTickets = async () => {
  return await db.select().from(tickets);
};

export const getTicketById = async (id) => {
  const result = await db
    .select()
    .from(tickets)
    .where(eq(tickets.ticket_id, id));

  return result[0];
};

export const updateTicket = async (
  id,
  data
) => {
  const result = await db
    .update(tickets)
    .set({
      ...data,
      updated_at: new Date(),
    })
    .where(eq(tickets.ticket_id, id))
    .returning();

  return result[0];
};

export const closeTicket = async (id) => {
  const result = await db
    .update(tickets)
    .set({
      status_id: 4,
      closed_at: new Date(),
      updated_at: new Date(),
    })
    .where(eq(tickets.ticket_id, id))
    .returning();

  return result[0];
};

export const assignTicket = async (
  ticketId,
  assignedTo
) => {
  const result = await db
    .update(tickets)
    .set({
      assigned_to: assignedTo,
      updated_at: new Date(),
    })
    .where(eq(tickets.ticket_id, ticketId))
    .returning();

  return result[0];
};