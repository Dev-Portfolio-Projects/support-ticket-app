import { db } from "../../db/index.js";
import { comments } from "../../schema/comments.js";
import { eq } from "drizzle-orm";

export const createComment = async (
  ticket_id,
  user_id,
  content
) => {
  const result = await db
    .insert(comments)
    .values({
      ticket_id,
      user_id,
      content,
    })
    .returning();

  return result[0];
};

export const getCommentsByTicket = async (ticket_id) => {
  return await db
    .select()
    .from(comments)
    .where(eq(comments.ticket_id, ticket_id));
};