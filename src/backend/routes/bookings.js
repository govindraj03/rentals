const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const { authMiddleware } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      listingId,
      checkIn,
      checkOut,
      guests,
      guestDetails,
      paymentMethod,
      specialRequests
    } = req.body;

    // Find listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check availability
    if (!listing.isAvailable(checkIn, checkOut)) {
      return res.status(400).json({ message: 'Listing not available for selected dates' });
    }

    // Check guest capacity
    const totalGuests = (guests.adults || 0) + (guests.children || 0);
    if (totalGuests > listing.capacity.guests) {
      return res.status(400).json({ message: 'Too many guests for this listing' });
    }

    // Calculate pricing
    const pricing = listing.calculateTotalPrice(checkIn, checkOut);

    // Create booking
    const booking = new Booking({
      listing: listingId,
      guest: req.userId,
      host: listing.host,
      dates: {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        nights: pricing.nights
      },
      guests,
      pricing: {
        basePrice: listing.pricing.basePrice,
        cleaningFee: pricing.cleaningFee,
        serviceFee: pricing.serviceFee,
        subtotal: pricing.subtotal,
        total: pricing.total,
        currency: listing.pricing.currency
      },
      payment: {
        method: paymentMethod,
        status: 'pending'
      },
      guestDetails,
      specialRequests
    });

    await booking.save();

    // Add blocked dates to listing
    listing.blockedDates.push({
      from: new Date(checkIn),
      to: new Date(checkOut)
    });
    await listing.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { type = 'guest', status } = req.query;

    const query = type === 'guest' 
      ? { guest: req.userId }
      : { host: req.userId };

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('listing', 'title images location pricing')
      .populate('guest', 'firstName lastName avatar email')
      .populate('host', 'firstName lastName avatar email')
      .sort('-createdAt');

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('listing')
      .populate('guest', 'firstName lastName avatar email phone')
      .populate('host', 'firstName lastName avatar email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is guest or host
    if (
      booking.guest._id.toString() !== req.userId &&
      booking.host._id.toString() !== req.userId
    ) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/confirm
// @desc    Confirm a booking (host only)
// @access  Private
router.put('/:id/confirm', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the host
    if (booking.host.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Booking cannot be confirmed' });
    }

    booking.status = 'confirmed';
    booking.payment.status = 'completed';
    booking.payment.paidAt = new Date();
    await booking.save();

    res.json({
      message: 'Booking confirmed successfully',
      booking
    });
  } catch (error) {
    console.error('Confirm booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const { reason } = req.body;

    const booking = await Booking.findById(req.params.id)
      .populate('listing');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is guest or host
    if (
      booking.guest.toString() !== req.userId &&
      booking.host.toString() !== req.userId
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if booking can be cancelled
    if (!booking.canBeCancelled()) {
      return res.status(400).json({ 
        message: 'Booking cannot be cancelled within 48 hours of check-in' 
      });
    }

    // Calculate refund
    const refundAmount = booking.calculateRefund();

    booking.status = 'cancelled';
    booking.cancellation = {
      cancelledBy: req.userId,
      cancelledAt: new Date(),
      reason,
      refundAmount
    };
    await booking.save();

    // Remove blocked dates from listing
    const listing = booking.listing;
    listing.blockedDates = listing.blockedDates.filter(block => {
      return !(
        block.from.getTime() === booking.dates.checkIn.getTime() &&
        block.to.getTime() === booking.dates.checkOut.getTime()
      );
    });
    await listing.save();

    res.json({
      message: 'Booking cancelled successfully',
      booking,
      refundAmount
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/listing/:listingId/availability
// @desc    Check listing availability
// @access  Public
router.get('/listing/:listingId/availability', async (req, res) => {
  try {
    const { month, year } = req.query;

    const listing = await Listing.findById(req.params.listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Get all confirmed bookings for this listing
    const bookings = await Booking.find({
      listing: req.params.listingId,
      status: { $in: ['pending', 'confirmed'] }
    }).select('dates');

    // Combine with blocked dates
    const unavailableDates = [
      ...listing.blockedDates,
      ...bookings.map(b => ({ from: b.dates.checkIn, to: b.dates.checkOut }))
    ];

    res.json({
      available: true,
      unavailableDates,
      minNights: listing.availability.minNights,
      maxNights: listing.availability.maxNights
    });
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
