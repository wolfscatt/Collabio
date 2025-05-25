const projectRepo = require('../repositories/projectRepository');

const createProject = async (data, ownerId) => {
    const project = await projectRepo.create({ ...data, owner: ownerId });

    // owner hariç tüm üyeleri user rolüne çek
    if (data.members && data.members.length > 0) {
      const userRole = await Role.findOne({ name: 'user' });
  
      const updatePromises = data.members
        .filter(memberId => String(memberId) !== String(ownerId)) // owner hariç
        .map(memberId => User.findByIdAndUpdate(memberId, { role: userRole._id }));
  
      await Promise.all(updatePromises);
    }
  
    return project;
};

const getProjectsByUser = async (userId) => {
  return await projectRepo.getByUser(userId);
};

const updateProject = async (id, updates, userId) => {
  const project = await projectRepo.getById(id);
  if (!project || String(project.owner._id) !== String(userId)) {
    const err = new Error('Bu projeyi güncelleme yetkiniz yok');
    err.status = 403;
    throw err;
  }

  return await projectRepo.update(id, updates);
};

const deleteProject = async (id, userId) => {
  const project = await projectRepo.getById(id);
  if (!project || String(project.owner._id) !== String(userId)) {
    const err = new Error('Bu projeyi silme yetkiniz yok');
    err.status = 403;
    throw err;
  }

  return await projectRepo.remove(id);
};

module.exports = {
  createProject,
  getProjectsByUser,
  updateProject,
  deleteProject
};
