const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    fileUrl:{
        type: String,
        required: true
    },
    fileName:{
        type: String,
    },
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploadedDate:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Attachment', AttachmentSchema);