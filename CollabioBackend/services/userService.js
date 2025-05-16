const userRepo = require('../repositories/userRepository');

const getCurrentUser = async (userId) => {
  return await userRepo.getById(userId);
};

module.exports = { getCurrentUser };
