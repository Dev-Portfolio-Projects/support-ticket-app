import * as service from "./audit.service.js";

export const list = async (req, res) => {
  const logs = await service.getLogs();

  res.json({
    ok: true,
    logs,
  });
};