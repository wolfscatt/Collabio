const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

// GET users/currentUser → Mevcut kullanıcıyı döner
router.get('/currentUser', auth, controller.getCurrentUser);

module.exports = router;
