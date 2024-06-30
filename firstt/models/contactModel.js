const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
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

module.exports = mongoose.model("Contact", contactSchema);