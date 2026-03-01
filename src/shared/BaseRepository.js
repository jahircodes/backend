const createBaseRepository = ({ prisma, model }) => {
  const delegate = prisma[model];

  const findOne = (where, options = {}) => delegate.findUnique({ where, ...options });

  const findById = (id, options = {}) => findOne({ id }, options);

  const findMany = (where = {}, options = {}) => delegate.findMany({ where, ...options });

  const create = (data, options = {}) => delegate.create({ data, ...options });

  const update = (where, data, options = {}) => delegate.update({ where, data, ...options });

  const remove = (where, options = {}) => delegate.delete({ where, ...options });

  return { findOne, findById, findMany, create, update, delete: remove };
};

module.exports = { createBaseRepository };
