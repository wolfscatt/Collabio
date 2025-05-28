const User = require('../models/User');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByEmails = async (emails) => {
  return await User.find({ email: { $in: emails } });
};

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const getById = async (id) => {
  return await User.findById(id).select('-password').populate('role', 'name permissions');
};

// FAVORITES EKLENTİLERİ
const addFavorite = async (userId, projectId) => {
  const user = await User.findById(userId);
  if (!user.favorites.includes(projectId)) {
    user.favorites.push(projectId);
    await user.save();
  }
  return user;
};

const removeFavorite = async (userId, projectId) => {
  const user = await User.findById(userId);
  user.favorites = user.favorites.filter(id => id.toString() !== projectId);
  await user.save();
  return user;
};

const getFavorites = async (userId) => {
  return await User.findById(userId).populate('favorites');
};

module.exports = {
  findByEmail,
  findByEmails,
  createUser,
  getById,
  addFavorite,
  removeFavorite,
  getFavorites
};