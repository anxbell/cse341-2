const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

//GET - all contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieves a list of all contacts in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of contacts.
 *       500:
 *         description: Server error.
 */
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//GET - contact by id
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieves a single contact by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved the contact.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST - create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Adds a new contact to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contact created successfully.
 *       400:
 *         description: Bad request. Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newContact = await Contact.create({ firstName, lastName, email, favoriteColor, birthday });
        res.status(201).json({ id: newContact._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//PUT - Update by ID
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Updates an existing contact in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       204:
 *         description: Contact updated successfully.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.put("/:id", async (req, res) => {
//     try {
//         const contactExists = await Contact.findById(req.params.id);
//         if (!contactExists) {
//             return res.status(404).json({ error: "Contact not found" });
//         }

//         const contact = await Contact.findByIdAndUpdate (
//             req.params.id,
//             req.body,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );

//         if (!contact)
//     }
// });
//DELETE contact by id
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Removes a contact from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID.
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
