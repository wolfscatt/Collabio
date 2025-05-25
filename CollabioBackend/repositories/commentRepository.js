const Comment = require('../models/Comment');

const create = async (data) => await Comment.create(data);

const getByTaskId = async (taskId) => {
  return await Comment.find({ taskId }).populate('authorUserId', 'username email');
};

const getById = async (id) => await Comment.findById(id);

const update = async (id, updates) => {
  return await Comment.findByIdAndUpdate(id, updates, { new: true });
};

const remove = async (id) => await Comment.findByIdAndDelete(id);

module.exports = {
  create,
  getByTaskId,
  getById,
  update,
  remove
};