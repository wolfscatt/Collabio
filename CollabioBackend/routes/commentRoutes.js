const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentController');
const { auth } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const upload = require('../middlewares/uploadCommentFile');
const { addCommentSchema, updateCommentSchema } = require('../validations/commentValidation');

// GET: Belirli bir task’e ait yorumları getir
router.get('/:taskId', auth, controller.getByTask);

// POST: Yorum ekle
router.post('/:taskId', auth, upload, validate(addCommentSchema), controller.add);

// PUT: Yorum güncelle
router.put('/:id', auth, upload, validate(updateCommentSchema), controller.update);

// DELETE: Yorum sil
router.delete('/:id', auth, controller.remove);

module.exports = router;
