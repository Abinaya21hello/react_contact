const express = require('express');
const router = express.Router();
const contactController = require('./controller');

// Create a new contact
router.post('/contacts', contactController.createContact);

// Get all contacts
router.get('/contacts', contactController.getAllContacts);

// Get a single contact by ID
router.get('/contacts/:id', contactController.getContactById);

// Update a contact by ID
router.put('/contacts/:id', contactController.editContact);

// Delete a contact by ID
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
