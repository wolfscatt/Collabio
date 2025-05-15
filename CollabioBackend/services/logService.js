const logRepo = require('../repositories/logRepository');

const createLog = async ({ authorUserId, actionType, taskId }) => {
  return await logRepo.create({ authorUserId, actionType, taskId });
};

const getLogsByTask = async (taskId) => {
  return await logRepo.getByTaskId(taskId);
};

module.exports = {
  createLog,
  getLogsByTask
};
