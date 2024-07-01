const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");

/// @desc Contact list
// @route GET /api/contacts
/// @access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

/// @desc Create contact
// @route GET /api/contacts/
/// @access private
const createContact = asyncHandler( async (req, res) => {
    console.log("The request body is :", req.body)
    const { firstname, lastname, email, phone, password } = req.body;
    if(!firstname || !lastname || !email || !phone || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    const contact = await Contact.create({
        firstname,
        lastname,
        email,
        phone,
        password,
        user_id: req.user.id,
    })

    res.status(201).json(contact);
})

/// @desc View Contact
// @route GET /api/contacts/:id
/// @access private
const viewContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404);
        throw new Error('Not Found');
    }
    res.status(200).json(contact);
})

/// @desc Update Contact
// @route GET /api/contacts/:id
/// @access private
const updateContact =  asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error('Contact Not Found');
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        )
    res.status(200).json(updatedContact);
})

/// @desc Delete Contact
// @route DELETE /api/contacts/:id
/// @access private
const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error('Not Found');
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact);
})

module.exports = {
    getContact,
    createContact,
    viewContact,
    updateContact,
    deleteContact
}