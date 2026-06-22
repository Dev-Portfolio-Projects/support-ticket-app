import { createUser, loginUser, changePasswordService } from "./auth.service.js";

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

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user_id = req.user.user_id;

    await changePasswordService({
      user_id,
      currentPassword,
      newPassword,
    });

    res.json({
      ok: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};