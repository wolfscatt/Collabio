const taskRepo = require('../repositories/taskRepository');
const Role = require('../models/Role');
const ACTIONTYPES = require('../enums/actionTypeEnum');
const APPROVAL_STATUSES = require('../enums/approvalStatusEnum');
const withLogging = require('../utils/withLogging');

// Task oluşturma servisi - reporter ise görevi oluşturan kişidir.
const _createTask = async ({data}, user) => {
  const task = await taskRepo.create({
    ...data,
    reporter: user._id
  });
  return task;
};
// WithLogging ile task oluşturma işlemini sarmalıyoruz
// Böylece her görev oluşturulduğunda log kaydı oluşturulacak
const createTask = withLogging(ACTIONTYPES.CREATE_TASK, _createTask);


// Proje ID'sine göre görevleri alma servisi
const getTasksByProject = async (projectId) => {
  return await taskRepo.getByProject(projectId);
};

// Görev güncelleme servisi
const _updateTask = async ({id, updates}, user) => {
  const task = await taskRepo.getById(id);

  if (!task) {
    const err = new Error('Görev bulunamadı.');
    err.status = 404;
    throw err;
  }

  const isAssignee = String(task.assignee?._id) === String(user._id);
  const isReporter = String(task.reporter?._id) === String(user._id);
  const isProjectManager = user.role?.name === 'project_manager';

  if (!isAssignee && !isReporter && !isProjectManager) {
    const err = new Error('Sadece görev sahibi, rapor veren veya proje yöneticisi güncelleme yapabilir.');
    err.status = 403;
    throw err;
  }

  return await taskRepo.update(id, updates);
};
// WithLogging ile task güncelleme işlemini sarmalıyoruz
const updateTask = withLogging(ACTIONTYPES.UPDATE_TASK, _updateTask);

// Görev silme servisi
const _deleteTask = async ({id}, user) => {
  const task = await taskRepo.getById(id);

  if (!task) {
    const err = new Error('Görev bulunamadı.');
    err.status = 404;
    throw err;
  }

  const isAssignee = String(task.assignee?._id) === String(user._id);
  const isReporter = String(task.reporter?._id) === String(user._id);
  const isProjectManager = user.role?.name === 'project_manager';

  if (!isAssignee && !isReporter && !isProjectManager) {
    const err = new Error('Sadece görev sahibi, rapor veren veya proje yöneticisi silebilir.');
    err.status = 403;
    throw err;
  }

  return await taskRepo.remove(id);
};
// WithLogging ile task silme işlemini sarmalıyoruz
const deleteTask = withLogging(ACTIONTYPES.DELETE_TASK, _deleteTask);

// Görev onaylama servisi
// Proje yöneticisi tarafından onaylanacak görevleri onaylama
const _approveTask = async ({ taskId, newStatus }, user) => {
  if (user.role?.name !== 'project_manager') {
    const err = new Error('Sadece proje yöneticisi onay verebilir.');
    err.status = 403;
    throw err;
  }

  // newStatus: 'approved', 'rejected' veya 'pending'
  if (!Object.values(APPROVAL_STATUSES).includes(newStatus)) {
    const err = new Error('Geçersiz onay durumu.');
    err.status = 400;
    throw err;
  }

  const task = await taskRepo.update(taskId, {
    approvalStatus: newStatus,
    approvedAt: newStatus === APPROVAL_STATUSES.APPROVED ? new Date() : null
  });

  return task;
};
// WithLogging ile task onaylama işlemini sarmalıyoruz
const approveTask = withLogging(ACTIONTYPES.APPROVE_TASK, _approveTask);

// Task statüsünü güncelleme servisi
const _changeStatus = async ({taskId, newStatus}, user) => {
  const task = await taskRepo.getById(taskId);
  if (!task) {
    const err = new Error('Görev bulunamadı');
    err.status = 404;
    throw err;
  }

  // (Opsiyonel) Sadece assignee ve proje yöneticisi değiştirebilsin:
  const isAssignee = String(task.assignee?._id) === String(user._id);
  const isProjectManager = user.role?.name === 'project_manager';

  if (!isAssignee && !isProjectManager) {
    const err = new Error('Sadece görevi atanan kişi veya proje yöneticisi statüyü değiştirebilir.');
    err.status = 403;
    throw err;
  }

  const updated = await taskRepo.update(taskId, { status: newStatus });

  return updated;
};
// WithLogging ile task statüsünü güncelleme işlemini sarmalıyoruz
const changeStatus = withLogging(ACTIONTYPES.CHANGE_STATUS, _changeStatus);


module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  approveTask,
  changeStatus
};
