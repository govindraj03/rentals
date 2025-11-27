# ⚡ Quick Start - Run Locally in VS Code

Follow these steps to get your Airbnb clone running on your local machine.

## 📋 Prerequisites

Make sure you have installed:
- ✅ **Node.js** (v16+) - [Download](https://nodejs.org/)
- ✅ **VS Code** - [Download](https://code.visualstudio.com/)
- ✅ **MongoDB** - Choose one option below

---

## 🗄️ STEP 1: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended & FREE)

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Try Free" and sign up

2. **Create Free Cluster**
   - Choose **M0 FREE** tier
   - Select cloud provider (AWS)
   - Choose region closest to you
   - Click "Create Cluster" (wait 3-5 minutes)

3. **Create Database User**
   - Left sidebar → "Database Access"
   - Click "Add New Database User"
   - Username: `airbnb_admin`
   - Password: Click "Autogenerate Secure Password" → **COPY IT!**
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Allow Access**
   - Left sidebar → "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Confirm

5. **Get Connection String**
   - Left sidebar → "Database"
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://airbnb_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **IMPORTANT**: Replace `<password>` with your actual password!

### Option B: Local MongoDB (Alternative)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
- Download installer from: https://www.mongodb.com/try/download/community
- Run installer
- Start MongoDB service

**Your connection string:**
```
mongodb://localhost:27017/airbnb-clone
```

---

## 🔧 STEP 2: Configure Backend

### 1. Open Project in VS Code

```bash
# Open your project folder
code .
```

### 2. Open Terminal in VS Code

- Press: `` Ctrl + ` `` (backtick) or
- Menu: Terminal → New Terminal

### 3. Navigate to Backend Folder

```bash
cd backend
```

### 4. Install Dependencies

```bash
npm install
```

This will install:
- Express
- Mongoose  
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- and more...

Wait for installation to complete (1-2 minutes).

### 5. Configure Environment Variables

You already created `.env` from `.env.example`. Now edit it:

```bash
# In VS Code, open backend/.env file
```

**Edit the file with your values:**

```env
# Your MongoDB connection string (from Step 1)
MONGODB_URI=mongodb+srv://airbnb_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/airbnb-clone?retryWrites=true&w=majority

# Generate a secure JWT secret (see below)
JWT_SECRET=your-generated-secret-here

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Generate JWT Secret:**

Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` in `.env` file.

### 6. Seed Database with Sample Data

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Clearing existing data...
👤 Creating users...
✅ Created 3 users
🏠 Creating listings...
✅ Created 5 listings
⭐ Creating reviews...
✅ Created 2 reviews

✨ Database seeded successfully!

🔑 Test Credentials:
   Email: john@example.com
   Password: password123
```

### 7. Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📍 Environment: development
```

**✅ Backend is now running!**

Leave this terminal open and running.

---

## 🎨 STEP 3: Run Frontend

### 1. Open New Terminal

In VS Code:
- Click the `+` icon in terminal panel, or
- Press: `` Ctrl + Shift + ` ``

### 2. Make Sure You're in Project Root

```bash
# If you're in backend folder, go back
cd ..

# Verify you're in the root (you should see App.tsx)
ls
```

### 3. The Frontend is Already Set Up!

Since you're using Figma Make, the frontend should already be running in the preview.

However, you need to create a `.env` file in the root directory:

```bash
# Create .env file in root
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

Or create it manually in VS Code:
- Create file: `.env` in root folder
- Add this line:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 STEP 4: Test Everything Works

### Test Backend API

**Option 1: Browser**

Open these URLs in your browser:
1. http://localhost:5000 - Should show API info
2. http://localhost:5000/health - Should show health status
3. http://localhost:5000/api/listings - Should show listings JSON

**Option 2: VS Code REST Client**

Create a test file: `test-api.http`

```http
### Health Check
GET http://localhost:5000/health

### Get All Listings
GET http://localhost:5000/api/listings

### Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "+1234567890"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Test Frontend Connection

The frontend should now be able to connect to your backend. Check the browser console (F12) for any errors.

---

## 🎯 You're All Set!

### What's Running:

✅ **Backend**: http://localhost:5000
- MongoDB database connected
- API endpoints ready
- Sample data loaded

✅ **Frontend**: Figma Make preview
- Connected to backend
- Ready to use

### Test Accounts:

**Host Account 1:**
- Email: `john@example.com`
- Password: `password123`

**Host Account 2:**
- Email: `jane@example.com`
- Password: `password123`

**Guest Account:**
- Email: `mike@example.com`
- Password: `password123`

### Available Features:

1. ✅ Browse 5 sample listings
2. ✅ Sign in / Sign up
3. ✅ Create new listings (as host)
4. ✅ Make bookings
5. ✅ Leave reviews
6. ✅ Contact form

---

## 🔧 Common VS Code Terminal Commands

### Backend (in `/backend` folder):

```bash
# Start development server (auto-restart)
npm run dev

# Start production server
npm start

# Reset and reseed database
npm run seed

# Install new package
npm install package-name
```

### Check What's Running:

```bash
# See what's using port 5000
lsof -i :5000

# Kill process on port 5000 (if needed)
kill -9 $(lsof -t -i:5000)
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error: `MONGODB_URI is not defined`**
```bash
# Make sure backend/.env exists and has MONGODB_URI
cat backend/.env
```

**Error: `MongooseServerSelectionError`**
- Check MongoDB Atlas IP whitelist
- Verify connection string has correct password
- Make sure cluster is running

**Error: `Port 5000 already in use`**
```bash
# Kill the process
kill -9 $(lsof -t -i:5000)

# Or change port in backend/.env
PORT=5001
```

### Can't connect to API

**Check backend is running:**
- Look for "🚀 Server running on port 5000" in terminal

**Check MongoDB is connected:**
- Look for "✅ MongoDB Connected" in terminal

**Check .env file in root:**
- Make sure `REACT_APP_API_URL=http://localhost:5000/api` exists

### Database is empty

```bash
cd backend
npm run seed
```

---

## 📁 Useful VS Code Extensions

Install these for better development experience:

1. **MongoDB for VS Code** - View database directly in VS Code
2. **REST Client** - Test API endpoints in VS Code
3. **Thunder Client** - Alternative API testing tool
4. **ESLint** - Code linting
5. **Prettier** - Code formatting
6. **Auto Rename Tag** - For React/TSX files
7. **GitLens** - Git integration

---

## 💡 Pro Tips

### Multiple Terminals in VS Code

Keep these terminals open:
1. **Terminal 1**: Backend server (`cd backend && npm run dev`)
2. **Terminal 2**: General commands (git, etc.)

### View MongoDB Data

**Option 1: MongoDB Atlas Dashboard**
- Go to your cluster
- Click "Browse Collections"
- See all data visually

**Option 2: MongoDB Compass (Desktop App)**
- Download: https://www.mongodb.com/products/compass
- Connect using your connection string
- Browse/edit data visually

**Option 3: VS Code Extension**
- Install "MongoDB for VS Code"
- Connect to your database
- Browse collections in sidebar

### Auto-format Code

Add to VS Code settings (Ctrl+,):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 🎓 Next Steps

Now that everything is running:

1. **Explore the API** - Check `backend/API_REFERENCE.md`
2. **Customize the Frontend** - Edit components
3. **Add Features** - See `PROJECT_SUMMARY.md` for ideas
4. **Deploy** - See `SETUP_GUIDE.md` for deployment

---

## 📞 Need Help?

If something's not working:

1. ✅ Check terminals for error messages
2. ✅ Verify `.env` files are configured
3. ✅ Make sure MongoDB is accessible
4. ✅ Check firewall/antivirus isn't blocking ports
5. ✅ Try restarting VS Code

---

## 🎉 Enjoy Your Airbnb Clone!

You now have a fully functional booking platform running locally!

**Happy coding!** 🚀
