const logService = require('../services/logService');

exports.getByTask = async (req, res, next) => {
  try {
    const logs = await logService.getLogsByTask(req.params.taskId);
    res.json(logs);
  } catch (err) {
    next(err);
  }
};
