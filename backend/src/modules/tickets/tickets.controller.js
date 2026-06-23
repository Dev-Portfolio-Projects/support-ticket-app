import * as service from "./tickets.service.js";

export const create = async (req, res) => {
  const ticket = await service.createTicket(
    req.body
  );

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