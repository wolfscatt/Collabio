const User = require('../models/User');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const getById = async (id) => {
  return await User.findById(id).select('-password').populate('role', 'name permissions');
};


module.exports = {
  findByEmail,
  createUser,
  getById,
};
