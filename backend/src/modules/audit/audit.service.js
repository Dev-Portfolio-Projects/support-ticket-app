import { db } from "../../db/index.js";
import { audit_logs } from "../../schema/audit.js";

export const createLog = async ({
  user_id,
  action,
  entity,
  entity_id,
  metadata,
}) => {
  const result = await db
    .insert(audit_logs)
    .values({
      user_id,
      action,
      entity,
      entity_id,
      metadata: metadata ? JSON.stringify(metadata) : null,
    })
    .returning();

  return result[0];
};

export const getLogs = async () => {
  return await db.select().from(audit_logs);
};