const mongoose = require('mongoose');
const STATUSES = require("../enums/projectStatusEnum")

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: [STATUSES.ACTIVE, STATUSES.COMPLETE, STATUSES.CANCELED],
    default: STATUSES.ACTIVE
  },
  startDate:{
    type: Date
  },
  endDate:{
    type: Date
  },
  teamId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema); 