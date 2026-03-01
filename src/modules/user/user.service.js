const { ApiError } = require('../../shared/ApiError');

const createUserService = ({ userRepository }) => {
  const safeUserSelect = { id: true, email: true, role: true, createdAt: true };

  const list = () => userRepository.findMany({}, { select: safeUserSelect });

  const get = async (id) => {
    const user = await userRepository.findById(id, { select: safeUserSelect });
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  };

  const update = async (id, data) => {
    await get(id);
    const updated = await userRepository.update({ id }, data, { select: safeUserSelect });
    return updated;
  };

  const remove = async (id) => {
    await get(id);
    await userRepository.delete({ id });
    return { id };
  };

  return { list, get, update, remove };
};

module.exports = { createUserService };
