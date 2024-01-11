const express = require('express')
const router = express.Router()
const UserModels = require('./mongo')
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new UserModels({ name, email, message });
    await newContact.save();
    res.json({ message: 'Contact created successfully!', contact: newContact });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await UserModels.find();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await UserModels.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editContact = async (req, res) => {
  try {
    const updatedContact = await UserModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact updated successfully!', contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const deletedContact = await UserModels.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully!' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  editContact,
  deleteContact,
};