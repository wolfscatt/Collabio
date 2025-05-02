const Task = require('../models/Task');

const create = async (data) => await Task.create(data);
const getByProject = async (projectId) => await Task.find({ projectId }).populate('projectId assignee reporter');
const getById = async (id) => await Task.findById(id).populate('assignee reporter');
const update = async (id, updates) => await Task.findByIdAndUpdate(id, updates, { new: true });
const remove = async (id) => await Task.findByIdAndDelete(id);

module.exports = { create, getByProject, getById, update, remove };
