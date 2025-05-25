const userService = require('../services/userService');

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser(req.user._id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
