const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'villa', 'cabin', 'condo', 'other']
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'USA'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  capacity: {
    guests: {
      type: Number,
      required: true,
      min: 1
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0
    },
    beds: {
      type: Number,
      required: true,
      min: 1
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0.5
    }
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'kitchen', 'parking', 'pool', 'gym', 'ac', 'heating', 'tv', 'workspace', 'washer', 'dryer', 'hot_tub']
  }],
  images: [{
    url: String,
    caption: String
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    cleaningFee: {
      type: Number,
      default: 0
    },
    serviceFee: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  availability: {
    minNights: {
      type: Number,
      default: 1
    },
    maxNights: {
      type: Number,
      default: 365
    },
    instantBook: {
      type: Boolean,
      default: false
    }
  },
  blockedDates: [{
    from: Date,
    to: Date
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'inactive'],
    default: 'pending'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for location-based searches
listingSchema.index({ 'location.coordinates': '2dsphere' });
listingSchema.index({ 'location.city': 1, 'location.state': 1 });
listingSchema.index({ status: 1, featured: -1, 'rating.average': -1 });

// Virtual for total price calculation
listingSchema.virtual('totalPricePerNight').get(function() {
  return this.pricing.basePrice + this.pricing.serviceFee;
});

// Method to check availability
listingSchema.methods.isAvailable = function(checkIn, checkOut) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  for (let blocked of this.blockedDates) {
    if (
      (checkInDate >= blocked.from && checkInDate < blocked.to) ||
      (checkOutDate > blocked.from && checkOutDate <= blocked.to) ||
      (checkInDate <= blocked.from && checkOutDate >= blocked.to)
    ) {
      return false;
    }
  }
  return true;
};

// Method to calculate total booking price
listingSchema.methods.calculateTotalPrice = function(checkIn, checkOut) {
  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const subtotal = this.pricing.basePrice * nights;
  const cleaningFee = this.pricing.cleaningFee;
  const serviceFee = this.pricing.serviceFee * nights;
  const total = subtotal + cleaningFee + serviceFee;
  
  return {
    nights,
    subtotal,
    cleaningFee,
    serviceFee,
    total
  };
};

module.exports = mongoose.model('Listing', listingSchema);
