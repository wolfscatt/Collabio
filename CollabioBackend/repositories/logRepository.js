const Log = require('../models/Log');
const Task = require('../models/Task');

const create = async (data) => await Log.create(data);

const getByTaskId = async (taskId) => {
  return await Log.find({ taskId })
    .populate('authorUserId', 'username email')
    .sort({ createdAt: -1 }); // en yeni üstte
};

module.exports = {
  create,
  getByTaskId
};

const getFilteredLogs = async ({ startDate, endDate, actionType, taskStatus }) => {
  const filter = {};

  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (actionType) {
    filter.actionType = actionType;
  }

  // 🔥 taskStatus ile eşleşen loglar için populate ile task durumunu kontrol edebiliriz
  if (taskStatus) {
    // Önce ilgili task'ları bul
    const tasks = await Task.find({ status: taskStatus }, '_id');
    const taskIds = tasks.map(t => t._id);
    filter.taskId = { $in: taskIds };
  }

  return await Log.find(filter)
    .populate('authorUserId', 'username')
    .populate('taskId', 'title status');
};
