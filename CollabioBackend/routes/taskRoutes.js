const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const { auth } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/permissionMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createTaskSchema, updateTaskSchema } = require('../validations/taskValidation');

// GET: Projeye ait tüm task'lar
router.get('/:projectId', auth, controller.getByProject);

// POST: Yeni task oluştur
router.post('/', auth, checkPermission('create'), validate(createTaskSchema), controller.create);

// PUT: Task güncelle
router.put('/:id', auth, checkPermission('update'), validate(updateTaskSchema), controller.update);

// DELETE: Task sil
router.delete('/:id', auth, checkPermission('delete'), controller.remove);

module.exports = router;
