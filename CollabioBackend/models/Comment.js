const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    authorUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
