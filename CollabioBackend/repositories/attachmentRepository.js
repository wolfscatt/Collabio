const Attachment = require('../models/Attachment');

const create = async (data) => await Attachment.create(data);

const getByTask = async (taskId) => {
  return await Attachment.find({ taskId }).populate('uploadedBy', 'username email');
};

const remove = async (id) => await Attachment.findByIdAndDelete(id);

module.exports = {
  create,
  getByTask,
  remove
};
