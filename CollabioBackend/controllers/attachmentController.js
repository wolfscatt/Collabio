const attachmentService = require('../services/attachmentService');

exports.upload = async (req, res, next) => {
  try {
    const { fileUrl, fileName, taskId } = req.body;
    const result = await attachmentService.uploadAttachment({ fileUrl, fileName, taskId }, req.user._id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getByTask = async (req, res, next) => {
  try {
    const attachments = await attachmentService.getAttachments(req.params.taskId);
    res.json(attachments);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await attachmentService.deleteAttachment(req.params.id, req.user._id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
