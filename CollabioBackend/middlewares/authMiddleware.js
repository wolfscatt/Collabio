const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Kullanıcının gönderdiği JWT token’ı doğrular ve req.user içine kullanıcıyı ekler
 */
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token eksik.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).populate('role'); // rolü dahil et
    if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Geçersiz token.' });
  }
};

/**
 * Rol bazlı yetki kontrolü (RBAC)
 * @param {Array} roles ['admin', 'pm'] gibi roller
 */
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
    }
    next();
  };
};

module.exports = { auth, checkRole };
