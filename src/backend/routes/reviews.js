const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const { authMiddleware } = require('../middleware/auth');

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      bookingId,
      ratings,
      comment,
      reviewType
    } = req.body;

    // Find booking
    const booking = await Booking.findById(bookingId)
      .populate('listing');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    // Determine reviewee based on review type
    let reviewee;
    if (reviewType === 'guest_to_host') {
      if (booking.guest.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      reviewee = booking.host;
    } else {
      if (booking.host.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      reviewee = booking.guest;
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId, reviewType });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already submitted' });
    }

    // Create review
    const review = new Review({
      listing: booking.listing._id,
      booking: bookingId,
      reviewer: req.userId,
      reviewee,
      reviewType,
      ratings,
      comment
    });

    await review.save();

    // Update booking reviewed status
    if (reviewType === 'guest_to_host') {
      booking.reviewed.byGuest = true;
    } else {
      booking.reviewed.byHost = true;
    }
    await booking.save();

    // Update listing rating if guest to host review
    if (reviewType === 'guest_to_host') {
      const listingReviews = await Review.find({
        listing: booking.listing._id,
        reviewType: 'guest_to_host',
        visible: true
      });

      const totalRating = listingReviews.reduce((sum, r) => sum + r.ratings.overall, 0);
      const avgRating = totalRating / listingReviews.length;

      await Listing.findByIdAndUpdate(booking.listing._id, {
        'rating.average': avgRating,
        'rating.count': listingReviews.length
      });
    }

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/listing/:listingId
// @desc    Get reviews for a listing
// @access  Public
router.get('/listing/:listingId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({
      listing: req.params.listingId,
      reviewType: 'guest_to_host',
      visible: true
    })
      .populate('reviewer', 'firstName lastName avatar')
      .sort('-createdAt')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Review.countDocuments({
      listing: req.params.listingId,
      reviewType: 'guest_to_host',
      visible: true
    });

    res.json({
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews/:id/response
// @desc    Respond to a review (host only)
// @access  Private
router.post('/:id/response', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is the reviewee (host)
    if (review.reviewee.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.response = {
      text,
      respondedAt: new Date()
    };

    await review.save();

    res.json({
      message: 'Response added successfully',
      review
    });
  } catch (error) {
    console.error('Add response error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews/:id/helpful
// @desc    Mark review as helpful
// @access  Private
router.post('/:id/helpful', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const hasMarked = review.helpful.includes(req.userId);

    if (hasMarked) {
      // Remove from helpful
      review.helpful = review.helpful.filter(id => id.toString() !== req.userId);
    } else {
      // Add to helpful
      review.helpful.push(req.userId);
    }

    await review.save();

    res.json({
      message: hasMarked ? 'Unmarked as helpful' : 'Marked as helpful',
      helpfulCount: review.helpful.length
    });
  } catch (error) {
    console.error('Mark helpful error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
