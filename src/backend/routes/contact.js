const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, email, subject, message, category } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      category: category || 'general',
      user: req.userId || null
    });

    await contact.save();

    // TODO: Send email notification to support team

    res.status(201).json({
      message: 'Contact form submitted successfully. We will get back to you soon.',
      ticketId: contact._id
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact
// @desc    Get user's contact submissions
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.userId })
      .sort('-createdAt');

    res.json({ contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact/:id
// @desc    Get contact by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName')
      .populate('response.respondedBy', 'firstName lastName');

    if (!contact) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    // Check if user owns this contact or is admin
    if (contact.user && contact.user._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ contact });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
