const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    lastname: {
        type: String,
        required: [true, "Please add the last name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"]
    },
    password: {
        type: String,
        required: [true, "Please add the contact phone number"]
    },
}, { timestamps: true
})

module.exports = mongoose.model("Portfolio", portfolioSchema);