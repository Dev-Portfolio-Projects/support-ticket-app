import { db } from "../../db/index.js";
import { roles } from "../../schema/roles.js";

export const createRole = async (role_name) => {
  const role = await db
    .insert(roles)
    .values({
      role_name,
    })
    .returning();

  return role[0];
};

export const getRoles = async () => {
  return await db.select().from(roles);
};