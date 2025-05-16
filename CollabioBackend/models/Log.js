const mongoose = require('mongoose');
const ACTIONTYPES = require('../enums/actionTypeEnum');

const LogSchema = new mongoose.Schema({
    authorUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    actionType:{
        type: String,
        enum: [
            ACTIONTYPES.CREATE_TASK,
            ACTIONTYPES.UPDATE_TASK,
            ACTIONTYPES.DELETE_TASK,
            ACTIONTYPES.ADD_COMMENT,
            ACTIONTYPES.UPLOAD_FILE,
            ACTIONTYPES.CHANGE_STATUS,
            ACTIONTYPES.APPROVE_TASK,
        ],
        required: true
    },
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    timeStamp:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);
