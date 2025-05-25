const projectRepo = require('../repositories/projectRepository');
const userRepo = require('../repositories/userRepository');

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

const addMemberToProject = async (projectId, email, currentUser) => {
  const project = await projectRepo.getById(projectId);
  if (!project) {
    const err = new Error('Proje bulunamadı.');
    err.status = 404;
    throw err;
  }

  const isOwner = String(project.owner._id) === String(currentUser._id);
  const isProjectManager = currentUser.role?.name === 'project_manager';
  
  if (!isOwner && !isProjectManager) {
    const err = new Error('Sadece proje sahibi veya project manager üye ekleyebilir.');
    err.status = 403;
    throw err;
  }

  // 🔥 User modeline dokunmadan userRepo'yu kullanıyoruz
  const user = await userRepo.findByEmail(email);
  if (!user) {
    const err = new Error('Kullanıcı bulunamadı.');
    err.status = 404;
    throw err;
  }

  return await projectRepo.addMember(projectId, user._id);
};

module.exports = {
  createProject,
  getProjectsByUser,
  updateProject,
  deleteProject,
  addMemberToProject
};
