const Project = require('../models/Project');

const create = async (data) => await Project.create(data);
const getByOwner = async (userId) => await Project.find({ owner: userId }).populate('members', 'username email');
const getById = async (id) => await Project.findById(id).populate('members owner');
const update = async (id, updates) => await Project.findByIdAndUpdate(id, updates, { new: true });
const remove = async (id) => await Project.findByIdAndDelete(id);

module.exports = {
  create,
  getByOwner,
  getById,
  update,
  remove
};
