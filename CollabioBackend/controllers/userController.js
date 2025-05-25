const userService = require('../services/userService');

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser(req.user._id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// FAVORITES EKLENTİLERİ
exports.addFavorite = async (req, res, next) => {
  try {
    const updatedUser = await userService.addProjectToFavorites(req.user._id, req.params.projectId);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const updatedUser = await userService.removeProjectFromFavorites(req.user._id, req.params.projectId);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await userService.getFavoriteProjects(req.user._id);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};