const Task = require('../models/Task');

const create = async (data) => await Task.create(data);
// Proje ID’sine göre görevleri getirirken yorumları da getir
const getByProject = async (projectId) => {
  return await Task.find({ projectId })
    .populate({
      path: 'comments',
      populate: {
        path: 'authorUserId',
        select: 'username email'
      }
    })
    .populate('projectId assignee reporter');
};
const getById = async (id) => await Task.findById(id).populate('assignee reporter');
const update = async (id, updates) => await Task.findByIdAndUpdate(id, updates, { new: true });
const remove = async (id) => await Task.findByIdAndDelete(id);

module.exports = { create, getByProject, getById, update, remove };
