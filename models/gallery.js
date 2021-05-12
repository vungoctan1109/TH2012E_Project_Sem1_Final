const mongoose = require('mongoose');
const Gallery = mongoose.model('gallery', {
    name: {
        type: String,
        required: [true, 'Please enter a title for the photo'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description for the photo'],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, 'Please enter the photo link'],
        trim: true
    }
});

module.exports = Gallery;
