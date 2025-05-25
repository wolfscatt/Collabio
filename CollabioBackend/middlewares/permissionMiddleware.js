/**
 * Sistemdeki genel role.permission kontrolü
 */
const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
      const userPermissions = req.user.role?.permissions || [];
  
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
      }
  
      next();
    };
  };
  
  module.exports = { checkPermission };  