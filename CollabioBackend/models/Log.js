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
            ACTIONTYPES.CREATETASK,
            ACTIONTYPES.UPDATETASK,
            ACTIONTYPES.DELETETASK,
            ACTIONTYPES.ADDCOMMENT,
            ACTIONTYPES.UPLOADFILE,
            ACTIONTYPES.CHANGESTATUS
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
