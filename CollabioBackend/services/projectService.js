const projectRepo = require('../repositories/projectRepository');
const userRepo = require('../repositories/userRepository');

const createProject = async (data, ownerId) => {
    let memberIds = [];

    if (data.members && data.members.length > 0) {
      // Eğer data.members email dizisi ise userId'lere çevir
      const users = await userRepo.findByEmails(data.members); // Bu metod repoda yazılacak
      if (users.length !== data.members.length) {
        const err = new Error("Bazı email adresleri kullanıcılar ile eşleşmedi.");
        err.status = 400;
        throw err;
      }
      memberIds = users.map(user => user._id);
    }

    // Projeyi oluştur
    const project = await projectRepo.create({
      name: data.name,
      description: data.description,
      teamId: data.teamId,
      owner: ownerId,
      members: memberIds
    });

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

const removeMemberFromProject = async (projectId, email, currentUser) => {
  const project = await projectRepo.getById(projectId);
  if (!project) {
    const err = new Error('Proje bulunamadı.');
    err.status = 404;
    throw err;
  }

  const isOwner = String(project.owner._id) === String(currentUser._id);
  const isProjectManager = currentUser.role?.name === 'project_manager';
  
  if (!isOwner && !isProjectManager) {
    const err = new Error('Sadece proje sahibi veya project manager üye çıkarabilir.');
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

  return await projectRepo.removeMember(projectId, user._id);
};

module.exports = {
  createProject,
  getProjectsByUser,
  updateProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject
};
