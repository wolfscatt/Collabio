const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');
const { auth } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createProjectSchema, updateProjectSchema } = require('../validations/projectValidation');
const { checkPermission } = require('../middlewares/permissionMiddleware');
const { PERMISSIONS } = require('../enums/permissions');

// GET: Kullanıcının projeleri
router.get('/', auth, checkPermission(PERMISSIONS.READ), controller.getAll);

// POST: Yeni proje oluştur
router.post('/', auth, checkPermission(PERMISSIONS.CREATE), validate(createProjectSchema), controller.create);

// PUT: Projeyi güncelle
router.put('/:id', auth, checkPermission(PERMISSIONS.UPDATE), validate(updateProjectSchema), controller.update);

// DELETE: Projeyi sil
router.delete('/:id', auth, checkPermission(PERMISSIONS.DELETE), controller.remove);

// POST: Projeye üye ekle
router.post('/:id/members', auth, controller.addMember);

// DELETE: Projeden üye çıkar
router.delete('/:id/members', auth, controller.removeMember);


module.exports = router;
