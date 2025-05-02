const ROLES = require('./roleEnum');

const PERMISSIONS = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete'
};

const ROLE_PERMISSIONS = {
    [ROLES.PROJECT_MANAGER]: [
      PERMISSIONS.CREATE,
      PERMISSIONS.READ,
      PERMISSIONS.UPDATE,
      PERMISSIONS.DELETE
    ],
    [ROLES.MEMBER]: [
      PERMISSIONS.CREATE,
      PERMISSIONS.READ,
      PERMISSIONS.UPDATE
    ],
    [ROLES.USER]: [
      PERMISSIONS.READ
    ]
  };

  module.exports = { PERMISSIONS, ROLE_PERMISSIONS };