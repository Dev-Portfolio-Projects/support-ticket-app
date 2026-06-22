import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  const validPassword = await bcrypt.compare(
    password,
    user[0].password_hash
  );

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      user_id: user[0].user_id,
      email: user[0].email,
      role_id: user[0].role_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const { password_hash, ...safeUser } = user[0];

  return {
    user: safeUser,
    token,
  };
};