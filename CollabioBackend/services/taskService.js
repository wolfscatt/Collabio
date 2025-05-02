const taskRepo = require('../repositories/taskRepository');

const createTask = async (data, reporterId) => {
  return await taskRepo.create({
    ...data,
    reporter: reporterId
  });
};

const getTasksByProject = async (projectId) => {
  return await taskRepo.getByProject(projectId);
};

const updateTask = async (id, updates, userId) => {
  const task = await taskRepo.getById(id);
  if (!task || String(task.reporter._id) !== String(userId)) {
    const err = new Error('Bu görevi güncelleme yetkiniz yok.');
    err.status = 403;
    throw err;
  }
  return await taskRepo.update(id, updates);
};

const deleteTask = async (id, userId) => {
  const task = await taskRepo.getById(id);
  if (!task || String(task.reporter._id) !== String(userId)) {
    const err = new Error('Bu görevi silme yetkiniz yok.');
    err.status = 403;
    throw err;
  }
  return await taskRepo.remove(id);
};

module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
};
