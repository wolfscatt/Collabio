const User = require('../models/User');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

module.exports = {
  findByEmail,
  createUser
};
