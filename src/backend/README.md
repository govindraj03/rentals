# Airbnb Clone - Backend API

Complete MongoDB + Node.js + Express backend for the Airbnb-style booking platform.

## 🚀 Features

- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **Listings Management** - CRUD operations for property listings
- **Booking System** - Complete booking flow with availability checking
- **Review System** - Guest and host reviews with ratings
- **Contact Forms** - Support ticket system
- **Real-time Availability** - Dynamic date blocking and availability checks
- **RESTful API** - Clean, organized API endpoints

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema with authentication
│   ├── Listing.js       # Property listing schema
│   ├── Booking.js       # Booking schema with pricing
│   ├── Review.js        # Review and rating schema
│   └── Contact.js       # Contact form schema
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── listings.js      # Listing CRUD routes
│   ├── bookings.js      # Booking management routes
│   ├── reviews.js       # Review routes
│   └── contact.js       # Contact form routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── server.js            # Express server setup
├── package.json         # Dependencies
├── .env.example         # Environment variables template
└── README.md            # This file
```

## 🛠 Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Your connection string:
# mongodb://localhost:27017/airbnb-clone
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a FREE account
3. Create a new cluster (Free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 3. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env file
nano .env
```

Update `.env` with your values:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-random-secret-key-here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Listings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/listings` | Get all listings (with filters) | No |
| GET | `/api/listings/featured` | Get featured listings | No |
| GET | `/api/listings/:id` | Get single listing | No |
| POST | `/api/listings` | Create listing | Yes (Host) |
| PUT | `/api/listings/:id` | Update listing | Yes (Host) |
| DELETE | `/api/listings/:id` | Delete listing | Yes (Host) |

### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bookings` | Create booking | Yes |
| GET | `/api/bookings` | Get user bookings | Yes |
| GET | `/api/bookings/:id` | Get booking details | Yes |
| PUT | `/api/bookings/:id/confirm` | Confirm booking | Yes (Host) |
| PUT | `/api/bookings/:id/cancel` | Cancel booking | Yes |
| GET | `/api/bookings/listing/:id/availability` | Check availability | No |

### Reviews

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/reviews` | Create review | Yes |
| GET | `/api/reviews/listing/:id` | Get listing reviews | No |
| POST | `/api/reviews/:id/response` | Respond to review | Yes (Host) |
| POST | `/api/reviews/:id/helpful` | Mark as helpful | Yes |

### Contact

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/contact` | Submit contact form | No |
| GET | `/api/contact` | Get user's contacts | Yes |
| GET | `/api/contact/:id` | Get contact details | Yes |

## 🧪 Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get listings:**
```bash
curl http://localhost:5000/api/listings
```

### Using Postman

1. Import the endpoints into Postman
2. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

## 🗄 Database Models

### User
- Authentication & profile information
- Wishlist management
- Host status

### Listing
- Property details (type, location, capacity)
- Amenities
- Pricing
- Images
- Availability & blocked dates
- Ratings

### Booking
- Guest & host references
- Check-in/out dates
- Pricing breakdown
- Payment status
- Cancellation handling

### Review
- Rating categories
- Comments
- Host responses
- Helpful votes

### Contact
- Support tickets
- Status tracking
- Priority levels

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- MongoDB injection prevention
- CORS configuration

## 🚢 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add MongoDB Atlas connection string
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploy to Railway / Render

1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT tokens | Yes |
| PORT | Server port (default: 5000) | No |
| NODE_ENV | Environment (development/production) | No |
| FRONTEND_URL | Frontend URL for CORS | No |

## 🔧 Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials

**JWT Token Error:**
- Ensure JWT_SECRET is set in `.env`
- Check token format in Authorization header

**Port Already in Use:**
- Change PORT in `.env` file
- Or kill the process using the port

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for learning and development.
