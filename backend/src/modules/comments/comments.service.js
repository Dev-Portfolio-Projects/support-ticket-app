import { db } from "../../db/index.js";
import { comments } from "../../schema/comments.js";
import { eq } from "drizzle-orm";
import * as audit from "../audit/audit.service.js";

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

  const comment = result[0];

  await audit.createLog({
    user_id,
    action: "CREATE_COMMENT",
    entity: "comments",
    entity_id: comment.comment_id,
    metadata: {
      ticket_id,
      content: content?.slice(0, 200),
    },
  });

  return comment;
};

export const getCommentsByTicket = async (ticket_id) => {
  return await db
    .select()
    .from(comments)
    .where(eq(comments.ticket_id, ticket_id));
};