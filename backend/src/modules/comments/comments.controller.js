import {
  createComment,
  getCommentsByTicket,
} from "./comments.service.js";

export const addComment = async (req, res) => {
  try {
    const ticket_id = Number(req.params.ticketId);

    const comment = await createComment(
      ticket_id,
      req.user.user_id,
      req.body.content
    );

    res.status(201).json({
      ok: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export const listComments = async (req, res) => {
  try {
    const ticket_id = Number(req.params.ticketId);

    const comments = await getCommentsByTicket(ticket_id);

    res.json({
      ok: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};