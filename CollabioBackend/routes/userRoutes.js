const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

// GET users/currentUser → Mevcut kullanıcıyı döner
router.get('/currentUser', auth, controller.getCurrentUser);
router.post('/favorites/:projectId', auth, controller.addFavorite);
router.delete('/favorites/:projectId', auth, controller.removeFavorite);
router.get('/favorites', auth, controller.getFavorites);

module.exports = router;
