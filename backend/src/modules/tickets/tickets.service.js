import { db } from "../../db/index.js";
import { tickets } from "../../schema/tickets.js";
import { eq } from "drizzle-orm";
import * as audit from "../audit/audit.service.js";

export const createTicket = async (data) => {
  const result = await db
    .insert(tickets)
    .values(data)
    .returning();

  const ticket = result[0];

  await audit.createLog({
    user_id: data.requester_id,
    action: "CREATE_TICKET",
    entity: "tickets",
    entity_id: ticket.ticket_id,
    metadata: {
      title: data.title,
      priority: data.priority,
    },
  });

  return ticket;
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

export const updateTicket = async (id, data) => {
  const result = await db
    .update(tickets)
    .set({
      ...data,
      updated_at: new Date(),
    })
    .where(eq(tickets.ticket_id, id))
    .returning();

  const ticket = result[0];

  await audit.createLog({
    user_id: data.user_id,
    action: "UPDATE_TICKET",
    entity: "tickets",
    entity_id: id,
    metadata: data,
  });

  return ticket;
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

  const ticket = result[0];

  await audit.createLog({
    user_id: ticket.assigned_to || ticket.requester_id,
    action: "CLOSE_TICKET",
    entity: "tickets",
    entity_id: id,
    metadata: {
      status: "closed",
    },
  });

  return ticket;
};

export const assignTicket = async (ticketId, assignedTo) => {
  const result = await db
    .update(tickets)
    .set({
      assigned_to: assignedTo,
      updated_at: new Date(),
    })
    .where(eq(tickets.ticket_id, ticketId))
    .returning();

  const ticket = result[0];

  await audit.createLog({
    user_id: assignedTo,
    action: "ASSIGN_TICKET",
    entity: "tickets",
    entity_id: ticketId,
    metadata: {
      assigned_to: assignedTo,
    },
  });

  return ticket;
};