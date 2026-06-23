import * as service from "./catalog.service.js";

export const createStatus = async (req, res) => {
  const result = await service.createStatus(
    req.body
  );

  res.status(201).json({
    ok: true,
    status: result,
  });
};

export const createPriority = async (
  req,
  res
) => {
  const result = await service.createPriority(
    req.body
  );

  res.status(201).json({
    ok: true,
    priority: result,
  });
};

export const createCategory = async (
  req,
  res
) => {
  const result = await service.createCategory(
    req.body
  );

  res.status(201).json({
    ok: true,
    category: result,
  });
};

export const getStatuses = async (
  req,
  res
) => {
  res.json({
    ok: true,
    statuses: await service.getStatuses(),
  });
};

export const getPriorities = async (
  req,
  res
) => {
  res.json({
    ok: true,
    priorities: await service.getPriorities(),
  });
};

export const getCategories = async (
  req,
  res
) => {
  res.json({
    ok: true,
    categories: await service.getCategories(),
  });
};