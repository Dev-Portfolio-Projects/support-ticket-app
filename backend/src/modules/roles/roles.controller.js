import {
  createRole,
  getRoles,
} from "./roles.service.js";

export const create = async (req, res) => {
  try {
    const role = await createRole(
      req.body.role_name
    );

    res.status(201).json({
      ok: true,
      role,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

export const list = async (req, res) => {
  const roles = await getRoles();

  res.json({
    ok: true,
    roles,
  });
};