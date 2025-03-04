const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const contactController = require('../controller/contactController');

// GET all contacts
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
router.get('/', contactController.getAllContacts);

// GET contact by ID
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
router.get('/:id', contactController.getContactById);

// POST create a new contact
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
router.post("/", contactController.createContact);

// PUT update contact by ID
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
router.put("/:id", contactController.updateContact);

// DELETE contact by ID
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
router.delete("/:id", contactController.deleteContact);

module.exports = router;
