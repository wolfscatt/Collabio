const projectService = require('../services/projectService');

exports.create = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body, req.user._id);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getProjectsByUser(req.user._id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body, req.user._id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id, req.user._id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const { email } = req.body;
    const project = await projectService.addMemberToProject(req.params.id, email, req.user);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const { email } = req.body;
    const project = await projectService.removeMemberFromProject(req.params.id, email, req.user);
    res.json(project);
  } catch (err) {
    next(err);
  }
};