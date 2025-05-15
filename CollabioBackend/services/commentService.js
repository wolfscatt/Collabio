const commentRepo = require('../repositories/commentRepository');
const taskRepo = require('../repositories/taskRepository');
const ACTIONTYPES = require('../enums/actionTypeEnum');
const withLogging = require('../utils/withLogging');

// Yorum ekleme servisi
const _addComment = async ({taskId, content}, user) => {
  const comment = await commentRepo.create({ taskId, authorUserId: user._id, content });

  // Task.comments dizisine comment ID'yi ekle
  await taskRepo.update(taskId, {
    $push: { comments: comment._id }
  });

  return comment;
};
const addComment = withLogging(ACTIONTYPES.ADD_COMMENT, _addComment);

// Görev ID'sine göre yorumları alma servisi
const getCommentsByTask = async (taskId) => {
  return await commentRepo.getByTaskId(taskId);
};

// Yorum güncelleme servisi
const updateComment = async (commentId, userId, content) => {
  const comment = await commentRepo.getById(commentId);
  if (!comment) throw new Error('Yorum bulunamadı');
  if (String(comment.authorUserId) !== String(userId)) {
    const err = new Error('Yalnızca kendi yorumunuzu güncelleyebilirsiniz.');
    err.status = 403;
    throw err;
  }
//     // Task.comments dizisine comment ID'yi ekle
//   await taskRepo.update(taskId, {
//     $push: { comments: comment._id }
//   });

  return await commentRepo.update(commentId, content);
};

// Yorum silme servisi
const deleteComment = async (commentId, userId) => {
  const comment = await commentRepo.getById(commentId);
  if (!comment) throw new Error('Yorum bulunamadı');
  if (String(comment.authorUserId) !== String(userId)) {
    const err = new Error('Yalnızca kendi yorumunuzu silebilirsiniz.');
    err.status = 403;
    throw err;
  }

  await commentRepo.remove(commentId);

  // Task.comments listesinden çıkar
  await taskRepo.update(comment.taskId, {
    $pull: { comments: comment._id }
  });
};

module.exports = {
  addComment,
  getCommentsByTask,
  updateComment,
  deleteComment
};
