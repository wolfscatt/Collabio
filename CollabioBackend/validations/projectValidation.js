const Joi = require('joi');
const STATUSES = require('../enums/projectStatusEnum');

exports.createProjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null).required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  teamId: Joi.string(),
  members: Joi.array().items(Joi.string()) // userId'ler
});

exports.updateProjectSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid(STATUSES.ACTIVE, STATUSES.COMPLETE, STATUSES.CANCELED),
  startDate: Joi.date(),
  endDate: Joi.date(),
  members: Joi.array().items(Joi.string())
});
