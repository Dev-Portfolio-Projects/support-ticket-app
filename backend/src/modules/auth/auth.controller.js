import { createUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    res.json({
      ok: true,
      ...data,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    res.json({
      ok: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};