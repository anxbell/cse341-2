const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    favoriteColor: { type: String, required: true },
    birthday: { type: String, required: true },
    //favoriteColor and birthday changed to required
}, {versionKey: false}); //this disables __v

module.exports = mongoose.model('Contact', contactSchema);
//schema for contact collection and structure