const Project = require('../models/Project');

const create = async (data) => await Project.create(data);
// 📌 getByOwner yerine getByUser (owner veya member olan projeleri getir)
const getByUser = async (userId) => {
  return await Project.find({
    $or: [
      { owner: userId },
      { members: userId }
    ]
  }).populate('owner', 'username email').populate('members', 'username email');
};

const getById = async (id) => await Project.findById(id).populate('members owner');
const update = async (id, updates) => await Project.findByIdAndUpdate(id, updates, { new: true });
const remove = async (id) => await Project.findByIdAndDelete(id);

// Projeye üye ekleme fonksiyonu Email ile ekleme kısmı.
const addMember = async (projectId, userId) => {
  return await Project.findByIdAndUpdate(
    projectId,
    { $addToSet: { members: userId } }, // $addToSet tekrarı engeller
    { new: true }
  ).populate('owner', 'username email').populate('members', 'username email');
};

const removeMember = async (projectId, userId) => {
  return await Project.findByIdAndUpdate(
    projectId,
    { $pull: { members: userId } }, // $pull ile üyeyi çıkarıyoruz
    { new: true }
  ).populate('owner', 'username email').populate('members', 'username email');
};

module.exports = {
  create,
  getByUser,
  getById,
  update,
  remove,
  addMember,
  removeMember
};
