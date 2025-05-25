const logRepo = require('../repositories/logRepository');

const createLog = async ({ authorUserId, actionType, taskId }) => {
  return await logRepo.create({ authorUserId, actionType, taskId });
};

const getLogsByTask = async (taskId) => {
  return await logRepo.getByTaskId(taskId);
};

const getLogsByFiltered = async (filters) => {
  return await logRepo.getFilteredLogs(filters);
};

module.exports = {
  createLog,
  getLogsByTask,
  getLogsByFiltered
};
