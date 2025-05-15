const taskService = require('../services/taskService');

// Task Oluşturma kontrolcüsü
exports.create = async (req, res, next) => {
  try {
    const task = await taskService.createTask({data:req.body}, req.user);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Proje ID'sine göre görevleri alma kontrolcüsü
exports.getTasksByProjectController = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasksByProject(req.params.projectId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Görev güncelleme kontrolcüsü
exports.update = async (req, res, next) => {
  try {
    const task = await taskService.updateTask({id:req.params.id, updates: req.body}, req.user);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Görev silme kontrolcüsü
exports.remove = async (req, res, next) => {
  try {
    await taskService.deleteTask({id:req.params.id}, req.user);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Görev onaylama kontrolcüsü
exports.approve = async (req, res, next) => {
  try {
    const task = await taskService.approveTask({taskId:req.params.id}, req.user);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Görev statüsünü güncelleme kontrolcüsü
exports.changeStatus = async (req, res, next) => {
  try {
    const updated = await taskService.changeStatus({taskId:req.params.id, newStatus:req.body.status}, req.user);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

