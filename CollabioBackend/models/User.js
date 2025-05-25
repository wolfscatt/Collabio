const mongoose = require('mongoose');
const bcrypt = require('../utils/bcrypt');
const ROLES = require('../enums/roleEnum');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePictureUrl:{
    type: String
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: ROLES.USER 
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  favorites: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Project'
}]
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.comparePassword(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 