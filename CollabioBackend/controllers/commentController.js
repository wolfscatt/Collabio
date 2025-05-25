const commentService = require('../services/commentService');

// Yorum ekleme kontrolcüsü
exports.add = async (req, res, next) => {
  try {
    const { content } = req.body;
    const fileUrl = req.file ? `/uploads/comments/${req.file.filename}` : null;
    const fileName = req.file ? req.file.originalname : null;

    const comment = await commentService.addComment({
      taskId: req.params.taskId,
      content,
      fileUrl,
      fileName
    }, req.user);

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// Görev ID'sine göre yorumları alma kontrolcüsü
exports.getByTask = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByTask(req.params.taskId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// Yorum güncelleme kontrolcüsü
exports.update = async (req, res, next) => {
 try {
    const fileUrl = req.file ? `/uploads/comments/${req.file.filename}` : null;
    const fileName = req.file ? req.file.originalname : null;

    const updates = { content: req.body.content };
    if (fileUrl) {
      updates.fileUrl = fileUrl;
      updates.fileName = fileName;
    }

    const comment = await commentService.updateComment(req.params.id, req.user._id, updates);
    res.json(comment);
  } catch (err) {
    next(err);
  }
};

// Yorum silme kontrolcüsü
exports.remove = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id, req.user._id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
