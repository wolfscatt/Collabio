const mongoose = require('mongoose');
const {ROLES, PERMISSIONS} = require('../enums/roleEnum');
const { ALL_PERMISSIONS } = require('../utils/role-permissions');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Object.values(ROLES),
    required: true,
    unique: true,
    default: ROLES.USER
  },
  permissions: {
    type: [String],
    enum: ALL_PERMISSIONS,
    required: true,
    default: function() {
      return PERMISSIONS[this.name] || [];
    }
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);
