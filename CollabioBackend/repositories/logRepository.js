const Log = require('../models/Log');

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
