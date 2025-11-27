const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// @route   GET /api/listings
// @desc    Get all listings with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      city,
      state,
      guests,
      bedrooms,
      minPrice,
      maxPrice,
      amenities,
      propertyType,
      checkIn,
      checkOut,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { status: 'approved' };

    if (city) query['location.city'] = new RegExp(city, 'i');
    if (state) query['location.state'] = new RegExp(state, 'i');
    if (guests) query['capacity.guests'] = { $gte: parseInt(guests) };
    if (bedrooms) query['capacity.bedrooms'] = { $gte: parseInt(bedrooms) };
    if (minPrice || maxPrice) {
      query['pricing.basePrice'] = {};
      if (minPrice) query['pricing.basePrice'].$gte = parseInt(minPrice);
      if (maxPrice) query['pricing.basePrice'].$lte = parseInt(maxPrice);
    }
    if (amenities) {
      const amenitiesArray = amenities.split(',');
      query.amenities = { $all: amenitiesArray };
    }
    if (propertyType) query.propertyType = propertyType;

    // Execute query
    const listings = await Listing.find(query)
      .populate('host', 'firstName lastName avatar verified')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Filter by availability if dates provided
    let availableListings = listings;
    if (checkIn && checkOut) {
      availableListings = listings.filter(listing => 
        listing.isAvailable(checkIn, checkOut)
      );
    }

    const total = await Listing.countDocuments(query);

    res.json({
      listings: availableListings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/listings/featured
// @desc    Get featured listings
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const listings = await Listing.find({ 
      status: 'approved', 
      featured: true 
    })
      .populate('host', 'firstName lastName avatar verified')
      .sort('-rating.average')
      .limit(10);

    res.json({ listings });
  } catch (error) {
    console.error('Get featured listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/listings/:id
// @desc    Get listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('host', 'firstName lastName avatar verified bio createdAt');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment view count
    listing.views += 1;
    await listing.save();

    res.json({ listing });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/listings
// @desc    Create new listing
// @access  Private (Host)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      host: req.userId
    };

    const listing = new Listing(listingData);
    await listing.save();

    // Update user to be a host
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.userId, { isHost: true });

    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/listings/:id
// @desc    Update listing
// @access  Private (Host)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is the host
    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    // Update listing
    Object.assign(listing, req.body);
    await listing.save();

    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete listing
// @access  Private (Host)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is the host
    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await listing.deleteOne();

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/listings/host/:hostId
// @desc    Get listings by host
// @access  Public
router.get('/host/:hostId', async (req, res) => {
  try {
    const listings = await Listing.find({ 
      host: req.params.hostId,
      status: 'approved'
    }).populate('host', 'firstName lastName avatar verified');

    res.json({ listings });
  } catch (error) {
    console.error('Get host listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
