const attachmentRepo = require('../repositories/attachmentRepository');

const uploadAttachment = async ({ fileUrl, fileName, taskId }, userId) => {
  return await attachmentRepo.create({
    fileUrl,
    fileName,
    taskId,
    uploadedBy: userId
  });
};

const getAttachments = async (taskId) => {
  return await attachmentRepo.getByTask(taskId);
};

const deleteAttachment = async (id, userId) => {
  const attachment = await attachmentRepo.remove(id);

  if (!attachment) {
    const err = new Error('Dosya bulunamadı.');
    err.status = 404;
    throw err;
  }

  // Eğer yalnızca yükleyen silebilsin istenirse:
  if (String(attachment.uploadedBy) !== String(userId)) {
    const err = new Error('Bu dosyayı silme yetkiniz yok.');
    err.status = 403;
    throw err;
  }

  return attachment;
};

module.exports = {
  uploadAttachment,
  getAttachments,
  deleteAttachment
};
