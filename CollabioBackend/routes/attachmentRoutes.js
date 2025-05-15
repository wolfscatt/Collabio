const express = require('express');
const router = express.Router();
const controller = require('../controllers/attachmentController');
const { auth } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { uploadAttachmentSchema } = require('../validations/attachmentValidation');

// GET: Task'e ait dosyalar
router.get('/:taskId', auth, controller.getByTask);

// POST: Yeni dosya yükle
router.post('/', auth, validate(uploadAttachmentSchema), controller.upload);

// DELETE: Dosya sil
router.delete('/:id', auth, controller.remove);

module.exports = router;
