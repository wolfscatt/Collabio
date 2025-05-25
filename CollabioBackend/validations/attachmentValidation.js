const Joi = require('joi');

exports.uploadAttachmentSchema = Joi.object({
  fileUrl: Joi.string().uri().required(),
  fileName: Joi.string().optional(),
  taskId: Joi.string().required()
});
