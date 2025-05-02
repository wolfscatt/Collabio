const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    projectManagerName: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);