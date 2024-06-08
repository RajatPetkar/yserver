const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
