# 📘 API Reference - Airbnb Clone Backend

Complete reference for all API endpoints with request/response examples.

**Base URL:** `http://localhost:5000/api`

**Authentication:** Include JWT token in Authorization header for protected routes:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:** (201 Created)
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "isHost": false,
    "verified": false
  }
}
```

---

### Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isHost": false
  }
}
```

---

### Get Current User

**GET** `/auth/me` 🔒

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:** (200 OK)
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "isHost": false,
    "bio": "",
    "verified": false
  }
}
```

---

### Update Profile

**PUT** `/auth/profile` 🔒

Update user profile information.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1987654321",
  "bio": "Travel enthusiast",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response:** (200 OK)
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## 🏠 Listings

### Get All Listings

**GET** `/listings`

Retrieve listings with optional filters.

**Query Parameters:**
- `city` (string) - Filter by city
- `state` (string) - Filter by state
- `guests` (number) - Minimum guest capacity
- `bedrooms` (number) - Minimum bedrooms
- `minPrice` (number) - Minimum price per night
- `maxPrice` (number) - Maximum price per night
- `amenities` (string) - Comma-separated amenities (wifi,pool,kitchen)
- `propertyType` (string) - apartment, house, villa, cabin, condo
- `checkIn` (date) - Check-in date (YYYY-MM-DD)
- `checkOut` (date) - Check-out date (YYYY-MM-DD)
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 20)
- `sort` (string) - Sort field (default: -createdAt)

**Example:**
```
GET /listings?city=San Francisco&guests=2&amenities=wifi,pool&page=1&limit=10
```

**Response:** (200 OK)
```json
{
  "listings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Cozy Downtown Loft",
      "description": "Beautiful loft in the heart of the city...",
      "propertyType": "apartment",
      "location": {
        "address": "123 Main St",
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94103",
        "coordinates": { "lat": 37.7749, "lng": -122.4194 }
      },
      "capacity": {
        "guests": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1
      },
      "amenities": ["wifi", "kitchen", "ac"],
      "images": [
        { "url": "https://...", "caption": "Living room" }
      ],
      "pricing": {
        "basePrice": 120,
        "cleaningFee": 30,
        "serviceFee": 15
      },
      "rating": {
        "average": 4.8,
        "count": 24
      },
      "host": {
        "_id": "...",
        "firstName": "Jane",
        "lastName": "Smith",
        "avatar": "...",
        "verified": true
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### Get Featured Listings

**GET** `/listings/featured`

Get featured/highlighted listings.

**Response:** (200 OK)
```json
{
  "listings": [ ... ]
}
```

---

### Get Listing by ID

**GET** `/listings/:id`

Get detailed information about a specific listing.

**Response:** (200 OK)
```json
{
  "listing": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Cozy Downtown Loft",
    "description": "...",
    "propertyType": "apartment",
    "location": { ... },
    "capacity": { ... },
    "amenities": [ ... ],
    "images": [ ... ],
    "pricing": { ... },
    "rating": { ... },
    "host": {
      "_id": "...",
      "firstName": "Jane",
      "lastName": "Smith",
      "bio": "Experienced host...",
      "verified": true,
      "createdAt": "2023-01-15T..."
    },
    "views": 1523,
    "featured": true
  }
}
```

---

### Create Listing

**POST** `/listings` 🔒

Create a new property listing (host only).

**Request Body:**
```json
{
  "title": "Beautiful Beach House",
  "description": "Stunning beachfront property with amazing views...",
  "propertyType": "house",
  "location": {
    "address": "456 Ocean Drive",
    "city": "Miami",
    "state": "FL",
    "zipCode": "33139",
    "country": "USA",
    "coordinates": {
      "lat": 25.7617,
      "lng": -80.1918
    }
  },
  "capacity": {
    "guests": 6,
    "bedrooms": 3,
    "beds": 4,
    "bathrooms": 2
  },
  "amenities": ["wifi", "pool", "parking", "kitchen"],
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "caption": "Exterior view"
    }
  ],
  "pricing": {
    "basePrice": 250,
    "cleaningFee": 50,
    "serviceFee": 30
  },
  "availability": {
    "minNights": 2,
    "maxNights": 14,
    "instantBook": true
  }
}
```

**Response:** (201 Created)
```json
{
  "message": "Listing created successfully",
  "listing": { ... }
}
```

---

### Update Listing

**PUT** `/listings/:id` 🔒

Update existing listing (owner only).

**Request Body:** (partial updates allowed)
```json
{
  "title": "Updated Title",
  "pricing": {
    "basePrice": 200
  }
}
```

**Response:** (200 OK)
```json
{
  "message": "Listing updated successfully",
  "listing": { ... }
}
```

---

### Delete Listing

**DELETE** `/listings/:id` 🔒

Delete a listing (owner only).

**Response:** (200 OK)
```json
{
  "message": "Listing deleted successfully"
}
```

---

## 📅 Bookings

### Create Booking

**POST** `/bookings` 🔒

Create a new booking reservation.

**Request Body:**
```json
{
  "listingId": "507f1f77bcf86cd799439011",
  "checkIn": "2025-12-01",
  "checkOut": "2025-12-05",
  "guests": {
    "adults": 2,
    "children": 1,
    "infants": 0,
    "pets": 0
  },
  "guestDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "paymentMethod": "credit_card",
  "specialRequests": "Early check-in if possible"
}
```

**Response:** (201 Created)
```json
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "...",
    "listing": "507f1f77bcf86cd799439011",
    "guest": "...",
    "host": "...",
    "dates": {
      "checkIn": "2025-12-01T00:00:00.000Z",
      "checkOut": "2025-12-05T00:00:00.000Z",
      "nights": 4
    },
    "guests": {
      "adults": 2,
      "children": 1
    },
    "pricing": {
      "basePrice": 120,
      "cleaningFee": 30,
      "serviceFee": 60,
      "subtotal": 480,
      "total": 570
    },
    "payment": {
      "method": "credit_card",
      "status": "pending"
    },
    "status": "pending"
  }
}
```

---

### Get User Bookings

**GET** `/bookings` 🔒

Get current user's bookings (as guest or host).

**Query Parameters:**
- `type` (string) - "guest" or "host" (default: "guest")
- `status` (string) - pending, confirmed, cancelled, completed

**Example:**
```
GET /bookings?type=host&status=confirmed
```

**Response:** (200 OK)
```json
{
  "bookings": [
    {
      "_id": "...",
      "listing": {
        "_id": "...",
        "title": "Cozy Downtown Loft",
        "images": [ ... ],
        "location": { ... }
      },
      "guest": {
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "...",
        "email": "john@example.com"
      },
      "dates": { ... },
      "pricing": { ... },
      "status": "confirmed"
    }
  ]
}
```

---

### Get Booking by ID

**GET** `/bookings/:id` 🔒

Get detailed booking information.

**Response:** (200 OK)
```json
{
  "booking": { ... }
}
```

---

### Confirm Booking

**PUT** `/bookings/:id/confirm` 🔒

Confirm a booking (host only).

**Response:** (200 OK)
```json
{
  "message": "Booking confirmed successfully",
  "booking": { ... }
}
```

---

### Cancel Booking

**PUT** `/bookings/:id/cancel` 🔒

Cancel a booking (guest or host).

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

**Response:** (200 OK)
```json
{
  "message": "Booking cancelled successfully",
  "booking": { ... },
  "refundAmount": 285
}
```

---

### Check Availability

**GET** `/bookings/listing/:listingId/availability`

Check listing availability for specific dates.

**Query Parameters:**
- `month` (number) - Month (1-12)
- `year` (number) - Year

**Response:** (200 OK)
```json
{
  "available": true,
  "unavailableDates": [
    {
      "from": "2025-12-01T00:00:00.000Z",
      "to": "2025-12-05T00:00:00.000Z"
    }
  ],
  "minNights": 2,
  "maxNights": 14
}
```

---

## ⭐ Reviews

### Create Review

**POST** `/reviews` 🔒

Submit a review after completed booking.

**Request Body:**
```json
{
  "bookingId": "507f1f77bcf86cd799439011",
  "reviewType": "guest_to_host",
  "ratings": {
    "overall": 5,
    "cleanliness": 5,
    "accuracy": 5,
    "checkIn": 5,
    "communication": 5,
    "location": 4,
    "value": 5
  },
  "comment": "Amazing stay! Everything was perfect. Highly recommend!"
}
```

**Response:** (201 Created)
```json
{
  "message": "Review submitted successfully",
  "review": { ... }
}
```

---

### Get Listing Reviews

**GET** `/reviews/listing/:listingId`

Get all reviews for a listing.

**Query Parameters:**
- `page` (number) - Page number
- `limit` (number) - Reviews per page

**Response:** (200 OK)
```json
{
  "reviews": [
    {
      "_id": "...",
      "reviewer": {
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "..."
      },
      "ratings": {
        "overall": 5,
        "cleanliness": 5,
        ...
      },
      "comment": "Amazing place!",
      "helpful": ["user_id_1", "user_id_2"],
      "response": {
        "text": "Thank you for your kind words!",
        "respondedAt": "..."
      },
      "createdAt": "2025-01-15T..."
    }
  ],
  "pagination": { ... }
}
```

---

### Respond to Review

**POST** `/reviews/:id/response` 🔒

Add host response to a review.

**Request Body:**
```json
{
  "text": "Thank you for staying with us! We're glad you enjoyed your time."
}
```

**Response:** (200 OK)
```json
{
  "message": "Response added successfully",
  "review": { ... }
}
```

---

### Mark Review as Helpful

**POST** `/reviews/:id/helpful` 🔒

Mark/unmark a review as helpful.

**Response:** (200 OK)
```json
{
  "message": "Marked as helpful",
  "helpfulCount": 5
}
```

---

## 📧 Contact

### Submit Contact Form

**POST** `/contact`

Submit a contact/support request.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about booking",
  "message": "I have a question about cancellation policy...",
  "category": "booking"
}
```

**Categories:** `booking`, `payment`, `hosting`, `safety`, `general`

**Response:** (201 Created)
```json
{
  "message": "Contact form submitted successfully. We will get back to you soon.",
  "ticketId": "507f1f77bcf86cd799439011"
}
```

---

### Get User Contacts

**GET** `/contact` 🔒

Get all contact submissions by current user.

**Response:** (200 OK)
```json
{
  "contacts": [ ... ]
}
```

---

## ❌ Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Validation error description"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

---

## 🔒 Legend

- 🔒 = Requires authentication (JWT token)
- No lock = Public endpoint

---

## 📝 Notes

- All dates should be in ISO 8601 format (YYYY-MM-DD or full timestamp)
- All prices are in USD cents (multiply by 100 for API calls)
- JWT tokens expire after 7 days
- Rate limiting may apply in production
- For file uploads (images), use multipart/form-data

---

**Last Updated:** November 2025
**Version:** 1.0.0
