const userRepo = require('../repositories/userRepository');

const getCurrentUser = async (userId) => {
  return await userRepo.getById(userId);
};

// FAVORITES EKLENTİLERİ
const addProjectToFavorites = async (userId, projectId) => {
  return await userRepo.addFavorite(userId, projectId);
};

const removeProjectFromFavorites = async (userId, projectId) => {
  return await userRepo.removeFavorite(userId, projectId);
};

const getFavoriteProjects = async (userId) => {
  return await userRepo.getFavorites(userId);
};

module.exports = {
  getCurrentUser,
  addProjectToFavorites,
  removeProjectFromFavorites,
  getFavoriteProjects
};