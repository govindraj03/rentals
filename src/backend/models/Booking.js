const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dates: {
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    nights: {
      type: Number,
      required: true
    }
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0
    },
    infants: {
      type: Number,
      default: 0
    },
    pets: {
      type: Number,
      default: 0
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    cleaningFee: {
      type: Number,
      default: 0
    },
    serviceFee: {
      type: Number,
      default: 0
    },
    subtotal: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'apple_pay', 'google_pay'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rejected'],
    default: 'pending'
  },
  guestDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  specialRequests: {
    type: String,
    default: ''
  },
  cancellation: {
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number
  },
  reviewed: {
    byGuest: {
      type: Boolean,
      default: false
    },
    byHost: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ guest: 1, status: 1 });
bookingSchema.index({ host: 1, status: 1 });
bookingSchema.index({ listing: 1, 'dates.checkIn': 1, 'dates.checkOut': 1 });
bookingSchema.index({ status: 1, createdAt: -1 });

// Prevent double booking
bookingSchema.index(
  { listing: 1, 'dates.checkIn': 1, 'dates.checkOut': 1 },
  { 
    unique: true,
    partialFilterExpression: { status: { $in: ['pending', 'confirmed'] } }
  }
);

// Virtual for duration in days
bookingSchema.virtual('duration').get(function() {
  return Math.ceil((this.dates.checkOut - this.dates.checkIn) / (1000 * 60 * 60 * 24));
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const checkIn = new Date(this.dates.checkIn);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);
  
  // Can cancel if more than 48 hours before check-in and status is pending or confirmed
  return hoursUntilCheckIn > 48 && ['pending', 'confirmed'].includes(this.status);
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefund = function() {
  const now = new Date();
  const checkIn = new Date(this.dates.checkIn);
  const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);
  
  // Full refund if more than 7 days (168 hours)
  if (hoursUntilCheckIn > 168) {
    return this.pricing.total;
  }
  // 50% refund if between 2-7 days
  else if (hoursUntilCheckIn > 48) {
    return this.pricing.total * 0.5;
  }
  // No refund if less than 2 days
  return 0;
};

module.exports = mongoose.model('Booking', bookingSchema);
