const mongoose = require('mongoose');
const STATUSES = require('../enums/taskStatusEnum');
const PRIORITIES = require('../enums/priorityEnum');
const APPROVAL_STATUSES = require('../enums/approvedEnum');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: [STATUSES.TODO, STATUSES.INPROGRESS, STATUSES.REVIEW, STATUSES.DONE],
    default: STATUSES.TODO
  },
  priority: {
    type: String,
    enum: [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH, PRIORITIES.CRITICAL],
    default: PRIORITIES.MEDIUM
  },
  tags:{
    type: [String]
  },
  startDate:{
    type: Date
  },
  endDate:{
    type: Date
  },
  approvedAt:{
    type: Date
  },
  approvalStatus:{
    type: String,
    enum: [APPROVAL_STATUSES.REJECT, APPROVAL_STATUSES.PENDING, APPROVAL_STATUSES.APPROVED],
    default: APPROVAL_STATUSES.PENDING
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema); 