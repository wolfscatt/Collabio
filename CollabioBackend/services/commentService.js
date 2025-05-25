const commentRepo = require('../repositories/commentRepository');
const taskRepo = require('../repositories/taskRepository');
const ACTIONTYPES = require('../enums/actionTypeEnum');
const withLogging = require('../utils/withLogging');

// Yorum ekleme servisi
const _addComment = async ({ taskId, content, fileUrl, fileName }, user) => {
  const comment = await commentRepo.create({
    taskId,
    authorUserId: user._id,
    content,
    fileUrl,
    fileName
  });

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
const _updateComment = async (commentId, userId, updates) => {
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

  return await commentRepo.update(commentId, updates);
};
const updateComment = withLogging(ACTIONTYPES.UPDATE_COMMENT, _updateComment);
// Yorum silme servisi
const _deleteComment = async (commentId, userId) => {
  const comment = await commentRepo.getById(commentId);
  if (!comment) throw new Error('Yorum bulunamadı');
  if (String(comment.authorUserId) !== String(userId)) {
    const err = new Error('Yalnızca kendi yorumunuzu silebilirsiniz.');
    err.status = 403;
    throw err;
  }

  await commentRepo.remove(commentId);

  // Task.comments listesinden çıkar
  await taskRepo.update(comment.taskId, { $pull: { comments: comment._id } });
  
};
const deleteComment = withLogging(ACTIONTYPES.DELETE_COMMENT, _deleteComment);


module.exports = {
  addComment,
  getCommentsByTask,
  updateComment,
  deleteComment
};
