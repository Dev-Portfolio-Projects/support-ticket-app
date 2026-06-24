import * as service from "./tickets.service.js";

export const create = async (req, res) => {
  const ticket = await service.createTicket({
    ...req.body,
    requester_id: req.user.user_id,
  });

  res.status(201).json({
    ok: true,
    ticket,
  });
};

export const list = async (req, res) => {
  const tickets = await service.getTickets();

  res.json({
    ok: true,
    tickets,
  });
};

export const getById = async (req, res) => {
  const ticket =
    await service.getTicketById(
      Number(req.params.id)
    );

  res.json({
    ok: true,
    ticket,
  });
};

export const update = async (req, res) => {
  const ticket =
    await service.updateTicket(
      Number(req.params.id),
      req.body
    );

  res.json({
    ok: true,
    ticket,
  });
};

export const close = async (req, res) => {
  const ticket =
    await service.closeTicket(
      Number(req.params.id)
    );

  res.json({
    ok: true,
    ticket,
  });
};

export const assign =
  async (req, res) => {
    try {
      const ticketId = Number(
        req.params.id
      );

      const { assigned_to } = req.body;

      const ticket =
        await service.assignTicket(
          ticketId,
          assigned_to
        );

      res.json({
        ok: true,
        message:
          "Ticket assigned successfully",
        ticket,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error: error.message,
      });
    }
  };