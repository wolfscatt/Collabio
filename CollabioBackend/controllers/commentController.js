const commentService = require('../services/commentService');

// Yorum ekleme kontrolcüsü
exports.add = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await commentService.addComment({taskId: req.params.taskId, content}, req.user);
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
    const comment = await commentService.updateComment(req.params.id, req.user._id, req.body.content);
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
