const logService = require('../services/logService');

exports.getByTask = async (req, res, next) => {
  try {
    const logs = await logService.getLogsByTask(req.params.taskId);
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const { startDate, endDate, actionType, taskStatus } = req.query;
    const logs = await logService.getLogsByFiltered({ startDate, endDate, actionType, taskStatus });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};
