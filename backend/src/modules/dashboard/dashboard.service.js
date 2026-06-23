import { db } from "../../db/index.js";
import { tickets } from "../../schema/tickets.js";
import { eq, count, isNotNull, isNull } from "drizzle-orm";

export const getTotalTickets = async () => {
  const result = await db
    .select({ total: count() })
    .from(tickets);

  return result[0];
};

export const getTicketsByStatus = async () => {
  return await db
    .select({
      status_id: tickets.status_id,
      total: count(),
    })
    .from(tickets)
    .groupBy(tickets.status_id);
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
      priority_id: tickets.priority_id,
      total: count(),
    })
    .from(tickets)
    .groupBy(tickets.priority_id);
};