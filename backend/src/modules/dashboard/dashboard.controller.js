import * as service from "./dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const [total, byStatus, byPriority, openClosed] =
      await Promise.all([
        service.getTotalTickets(),
        service.getTicketsByStatus(),
        service.getTicketsByPriority(),
        service.getOpenVsClosed(),
      ]);

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
    console.error("Dashboard error:", error);

    res.status(500).json({
      ok: false,
      error: "Error al obtener dashboard",
    });
  }
};