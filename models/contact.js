const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    favoriteColor: String,
    birthday: String
});

module.exports = mongoose.model('Contact', contactSchema);
//schema for contact collection and structure