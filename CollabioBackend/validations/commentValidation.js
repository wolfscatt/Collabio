const Joi = require('joi');

exports.addCommentSchema = Joi.object({
  content: Joi.string().min(1).required()
});
exports.updateCommentSchema = Joi.object({
  content: Joi.string().min(1).required()
});