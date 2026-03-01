const { ApiError } = require('../../shared/ApiError');

const createUserService = ({ userRepository }) => {
  const list = () =>
    userRepository.findMany({}, { select: { id: true, email: true, role: true, createdAt: true } });

  const get = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  };

  const update = async (id, data) => {
    await get(id);
    const updated = await userRepository.update({ id }, data);
    return { id: updated.id };
  };

  const remove = async (id) => {
    await get(id);
    await userRepository.delete({ id });
    return { id };
  };

  return { list, get, update, remove };
};

module.exports = { createUserService };
