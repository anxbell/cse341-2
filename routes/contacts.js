const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); //:id refers to match mongo param


// POST - Create a new contact
// returns the ID of the new contact and a 201 status
router.post("/", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        const newContact = await Contact.create({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });
        res.status(201).json({
            id: newContact._id
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// PUT - Update a contact
//updating a contact that returns a 204 status
router.put("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
            new: true
        });

        if (!updatedContact) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE - Remove a contact
// deleting a contact that returns a 200 status
router.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.status(200).send(); // Success response
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



module.exports = router;
