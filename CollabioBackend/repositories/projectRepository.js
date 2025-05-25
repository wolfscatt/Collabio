const Project = require('../models/Project');

const create = async (data) => await Project.create(data);
// 📌 getByOwner yerine getByUser (owner veya member olan projeleri getir)
const getByUser = async (userId) => {
  return await Project.find({
    $or: [
      { owner: userId },
      { members: userId }
    ]
  }).populate('owner', 'username').populate('members', 'username email');
};

const getById = async (id) => await Project.findById(id).populate('members owner');
const update = async (id, updates) => await Project.findByIdAndUpdate(id, updates, { new: true });
const remove = async (id) => await Project.findByIdAndDelete(id);

module.exports = {
  create,
  getByUser,
  getById,
  update,
  remove
};
