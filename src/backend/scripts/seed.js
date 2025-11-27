const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// Load environment variables
dotenv.config();

// Sample data
const sampleUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    isHost: true,
    verified: true,
    bio: 'Experienced host with a passion for hospitality.'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+1987654321',
    isHost: true,
    verified: true,
    bio: 'Loving host who enjoys meeting new people.'
  },
  {
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    password: 'password123',
    phone: '+1122334455',
    isHost: false,
    verified: true
  }
];

const sampleListings = [
  {
    title: 'Cozy Downtown Loft with City Views',
    description: 'Experience city living at its finest in this beautifully designed loft featuring floor-to-ceiling windows, modern amenities, and spectacular skyline views. Perfect for business travelers or couples looking for a romantic getaway.',
    propertyType: 'apartment',
    location: {
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'USA',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    amenities: ['wifi', 'kitchen', 'ac', 'tv', 'workspace'],
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', caption: 'Living room' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', caption: 'Bedroom' }
    ],
    pricing: {
      basePrice: 120,
      cleaningFee: 30,
      serviceFee: 15,
      currency: 'USD'
    },
    availability: {
      minNights: 2,
      maxNights: 30,
      instantBook: true
    },
    status: 'approved',
    featured: true
  },
  {
    title: 'Luxury Beachfront Villa',
    description: 'Wake up to the sound of waves in this stunning beachfront villa. Featuring a private pool, outdoor kitchen, and direct beach access. Perfect for families or groups seeking a tropical paradise.',
    propertyType: 'villa',
    location: {
      address: '456 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
      country: 'USA',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 3
    },
    amenities: ['wifi', 'pool', 'parking', 'kitchen', 'ac', 'hot_tub'],
    images: [
      { url: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb', caption: 'Exterior' },
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', caption: 'Pool area' }
    ],
    pricing: {
      basePrice: 450,
      cleaningFee: 100,
      serviceFee: 50,
      currency: 'USD'
    },
    availability: {
      minNights: 3,
      maxNights: 14,
      instantBook: false
    },
    status: 'approved',
    featured: true
  },
  {
    title: 'Mountain Cabin Retreat',
    description: 'Escape to the mountains in this charming cabin surrounded by nature. Features a wood-burning fireplace, large deck with mountain views, and all the comforts of home.',
    propertyType: 'cabin',
    location: {
      address: '789 Mountain Road',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611',
      country: 'USA',
      coordinates: { lat: 39.1911, lng: -106.8175 }
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2
    },
    amenities: ['wifi', 'kitchen', 'parking', 'heating', 'washer'],
    images: [
      { url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8', caption: 'Cabin exterior' },
      { url: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e', caption: 'Living room' }
    ],
    pricing: {
      basePrice: 200,
      cleaningFee: 50,
      serviceFee: 25,
      currency: 'USD'
    },
    availability: {
      minNights: 2,
      maxNights: 21,
      instantBook: true
    },
    status: 'approved',
    featured: true
  },
  {
    title: 'Modern Studio in Heart of NYC',
    description: 'Stylish studio apartment in Manhattan with everything you need for a great New York experience. Walking distance to subway, restaurants, and attractions.',
    propertyType: 'apartment',
    location: {
      address: '321 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10007',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    capacity: {
      guests: 2,
      bedrooms: 0,
      beds: 1,
      bathrooms: 1
    },
    amenities: ['wifi', 'kitchen', 'ac', 'tv', 'gym'],
    images: [
      { url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9', caption: 'Studio layout' }
    ],
    pricing: {
      basePrice: 150,
      cleaningFee: 40,
      serviceFee: 20,
      currency: 'USD'
    },
    availability: {
      minNights: 1,
      maxNights: 30,
      instantBook: true
    },
    status: 'approved',
    featured: false
  },
  {
    title: 'Spacious Family House with Garden',
    description: 'Beautiful family home with large backyard, perfect for kids. Quiet neighborhood close to parks, schools, and shopping.',
    propertyType: 'house',
    location: {
      address: '555 Oak Avenue',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA',
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2.5
    },
    amenities: ['wifi', 'kitchen', 'parking', 'washer', 'dryer', 'ac'],
    images: [
      { url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c', caption: 'House exterior' }
    ],
    pricing: {
      basePrice: 180,
      cleaningFee: 60,
      serviceFee: 30,
      currency: 'USD'
    },
    availability: {
      minNights: 2,
      maxNights: 60,
      instantBook: false
    },
    status: 'approved',
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});

    // Create users
    console.log('👤 Creating users...');
    const users = await User.create(sampleUsers);
    console.log(`✅ Created ${users.length} users`);

    // Assign hosts to listings
    const listings = sampleListings.map((listing, index) => ({
      ...listing,
      host: users[index % 2]._id // Alternate between first two users as hosts
    }));

    // Create listings
    console.log('🏠 Creating listings...');
    const createdListings = await Listing.create(listings);
    console.log(`✅ Created ${createdListings.length} listings`);

    // Create some sample reviews
    console.log('⭐ Creating reviews...');
    const sampleReviews = [
      {
        listing: createdListings[0]._id,
        booking: new mongoose.Types.ObjectId(), // Mock booking ID
        reviewer: users[2]._id,
        reviewee: users[0]._id,
        reviewType: 'guest_to_host',
        ratings: {
          overall: 5,
          cleanliness: 5,
          accuracy: 5,
          checkIn: 5,
          communication: 5,
          location: 5,
          value: 5
        },
        comment: 'Amazing place! Everything was perfect. The views were stunning and the host was very responsive.'
      },
      {
        listing: createdListings[1]._id,
        booking: new mongoose.Types.ObjectId(),
        reviewer: users[2]._id,
        reviewee: users[1]._id,
        reviewType: 'guest_to_host',
        ratings: {
          overall: 4.5,
          cleanliness: 5,
          accuracy: 4,
          checkIn: 5,
          communication: 5,
          location: 4,
          value: 4
        },
        comment: 'Beautiful villa with great amenities. Would definitely stay again!'
      }
    ];

    await Review.create(sampleReviews);
    console.log(`✅ Created ${sampleReviews.length} reviews`);

    // Update listing ratings
    for (const listing of createdListings) {
      const reviews = await Review.find({
        listing: listing._id,
        reviewType: 'guest_to_host'
      });
      
      if (reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.ratings.overall, 0) / reviews.length;
        listing.rating = {
          average: avgRating,
          count: reviews.length
        };
        await listing.save();
      }
    }

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Listings: ${createdListings.length}`);
    console.log(`   Reviews: ${sampleReviews.length}`);
    console.log('\n🔑 Test Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: jane@example.com');
    console.log('   Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
