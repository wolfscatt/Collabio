const express = require('express');
const router = express.Router();
const controller = require('../controllers/logController');
const { auth } = require('../middlewares/authMiddleware');

// GET: Bir task'e ait log geçmişi
router.get('/:taskId', auth, controller.getByTask);

// GET: Filtrelenmiş log geçmişi
router.get('/', auth, controller.getLogs);

module.exports = router;
