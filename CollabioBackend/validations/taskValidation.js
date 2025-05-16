const Joi = require('joi');
const STATUSES = require('../enums/taskStatusEnum');
const PRIORITIES = require('../enums/priorityEnum');

exports.createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid(...Object.values(STATUSES)),
  priority: Joi.string().valid(...Object.values(PRIORITIES)),
  tags: Joi.array().items(Joi.string()),
  startDate: Joi.date(),
  endDate: Joi.date(),
  projectId: Joi.string().required(),
  assignee: Joi.string(),
  reporter: Joi.string()
});

exports.updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  status: Joi.string().valid(...Object.values(STATUSES)),
  priority: Joi.string().valid(...Object.values(PRIORITIES)),
  tags: Joi.array().items(Joi.string()),
  startDate: Joi.date(),
  endDate: Joi.date(),
  isApproved: Joi.boolean(),
  assignee: Joi.string(),
});
