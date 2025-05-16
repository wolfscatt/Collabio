const userRepository = require('../repositories/userRepository');
const generateToken = require('../utils/generateToken');
const Role = require('../models/Role'); 
const {ROLES} = require('../enums/roleEnum'); // Rol enumunu içe aktar

const register = async ({ username, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    const err = new Error('Email already exists');
    err.status = 400;
    throw err;
  }

  // Varsayılan olarak project_manager rolünü ata
  const defaultRole = await Role.findOne({ name: ROLES.PROJECT_MANAGER });
  console.log('Role enums:', ROLES.PROJECT_MANAGER);
  console.log('Default role from DB:', defaultRole);
  
  const user = await userRepository.createUser({
    username,
    email,
    password,
    role: defaultRole._id
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: defaultRole.name,
    token: generateToken(user._id)
  };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    token: generateToken(user._id)
  };
};

module.exports = {
  register,
  login
};
