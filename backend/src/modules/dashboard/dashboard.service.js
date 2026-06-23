import { db } from "../../db/index.js";
import { tickets } from "../../schema/tickets.js";
import { eq, count, isNotNull, isNull } from "drizzle-orm";
import { ticketStatuses } from "../../schema/catalog.js";
import { ticketPriorities } from "../../schema/catalog.js";

export const getTotalTickets = async () => {
  const result = await db
    .select({ total: count() })
    .from(tickets);

  return result[0];
};

export const getTicketsByStatus = async () => {
  return await db
    .select({
      status_name: ticketStatuses.status_name,
      total: count(),
    })
    .from(tickets)
    .innerJoin(
      ticketStatuses,
      eq(tickets.status_id, ticketStatuses.status_id)
    )
    .groupBy(ticketStatuses.status_name);
};

export const getOpenVsClosed = async () => {
  const open = await db
    .select({ total: count() })
    .from(tickets)
    .where(isNull(tickets.closed_at));

  const closed = await db
    .select({ total: count() })
    .from(tickets)
    .where(isNotNull(tickets.closed_at));

  return {
    open: open[0].total,
    closed: closed[0].total,
  };
};

export const getTicketsByPriority = async () => {
  return await db
    .select({
      priority_name: ticketPriorities.priority_name,
      sla_hours: ticketPriorities.sla_hours,
      total: count(),
    })
    .from(tickets)
    .innerJoin(
      ticketPriorities,
      eq(tickets.priority_id, ticketPriorities.priority_id)
    )
    .groupBy(
      ticketPriorities.priority_name,
      ticketPriorities.sla_hours
    );
};