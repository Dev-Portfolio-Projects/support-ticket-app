import bcrypt from "bcrypt";
import { db } from "../../db/index.js";
import { users } from "../../schema/users.js";
import { eq } from "drizzle-orm";

export const createUser = async ({ full_name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({
      full_name,
      email,
      password_hash: hashed,
    })
    .returning();

  return newUser[0];
};

export const loginUser = async ({ email, password }) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user.length) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(
    password,
    user[0].password_hash
  );

  if (!valid) {
    throw new Error("Invalid password");
  }

  return user[0];
};