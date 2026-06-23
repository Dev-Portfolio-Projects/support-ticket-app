import * as service from "./dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const total = await service.getTotalTickets();
    const byStatus = await service.getTicketsByStatus();
    const byPriority = await service.getTicketsByPriority();
    const openClosed = await service.getOpenVsClosed();

    res.json({
      ok: true,
      data: {
        total: total.total,
        byStatus,
        byPriority,
        openClosed,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};