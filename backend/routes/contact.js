import express from 'express';
import Contact from '../models/Contact.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
});

// Get all contact messages (Admin only)
router.get('/', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
});

// Get single contact message (Admin only)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching message',
      error: error.message
    });
  }
});

// Update contact message status (Admin only)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
});

// Toggle star status (Admin only)
router.patch('/:id/star', authenticate, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    contact.isStarred = !contact.isStarred;
    await contact.save();

    res.json({
      success: true,
      message: `Message ${contact.isStarred ? 'starred' : 'unstarred'} successfully`,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating star status',
      error: error.message
    });
  }
});

// Delete contact message (Admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
});

export default router;
