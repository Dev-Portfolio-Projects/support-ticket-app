import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/index.js";
import { users } from "../../schema/users.js";
import { eq } from "drizzle-orm";
import * as audit from "../audit/audit.service.js";

export const createUser = async ({ full_name, email, password, role_id = 3 }) => {
  const hashed = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({
      full_name,
      email,
      password_hash: hashed,
      role_id,
    })
    .returning();

  const user = newUser[0];

  await audit.createLog({
    user_id: user.user_id,
    action: "CREATE_USER",
    entity: "users",
    entity_id: user.user_id,
    metadata: {
      email: user.email,
      role_id,
    },
  });

  return user;
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

  await audit.createLog({
    user_id: user[0].user_id,
    action: "LOGIN_SUCCESS",
    entity: "auth",
    entity_id: user[0].user_id,
    metadata: {
      email: user[0].email,
    },
  });

  return {
    user: safeUser,
    token,
  };
};

export const changePasswordService = async ({
  user_id,
  currentPassword,
  newPassword,
}) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.user_id, user_id));

  if (!user.length) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(
    currentPassword,
    user[0].password_hash
  );

  if (!valid) {
    throw new Error("Current password is incorrect");
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({
      password_hash: newHash,
    })
    .where(eq(users.user_id, user_id));

  await audit.createLog({
    user_id,
    action: "PASSWORD_CHANGE",
    entity: "users",
    entity_id: user_id,
  });

  return true;
};

export const requestPasswordResetService = async ({ email }) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user.length) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expiry = new Date(Date.now() + 1000 * 60 * 15);

  await db
    .update(users)
    .set({
      reset_token: token,
      reset_token_exp: expiry,
    })
    .where(eq(users.email, email));

  await audit.createLog({
    user_id: user[0].user_id,
    action: "PASSWORD_RESET_REQUEST",
    entity: "auth",
    entity_id: user[0].user_id,
  });

  return {
    message: "Reset token generated",
    token,
  };
};

export const resetPasswordService = async ({
  token,
  newPassword,
}) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.reset_token, token));

  if (!user.length) {
    throw new Error("Invalid token");
  }

  const userData = user[0];

  if (new Date(userData.reset_token_exp) < new Date()) {
    throw new Error("Token expired");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({
      password_hash: hashed,
      reset_token: null,
      reset_token_exp: null,
    })
    .where(eq(users.user_id, userData.user_id));

  await audit.createLog({
    user_id: userData.user_id,
    action: "PASSWORD_RESET_DONE",
    entity: "auth",
    entity_id: userData.user_id,
  });

  return true;
};