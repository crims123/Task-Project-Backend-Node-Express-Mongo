const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    }, 
    projectId: {
        type: String,
        require: true,
        trim: true,
    }, 
    state: {
        type: Boolean,
        default: false,
    }, 
    register: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Task', taskSchema);