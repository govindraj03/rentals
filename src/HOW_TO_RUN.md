# 🎯 How to Run This Site Locally in VS Code

## 📖 Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Testing](#testing)
5. [Common Commands](#common-commands)

---

## ✅ Prerequisites

Before you start, install these:

### 1. Node.js (Required)
```bash
# Check if installed
node --version

# Should show: v16.0.0 or higher
# If not installed, download from: https://nodejs.org/
```

### 2. VS Code (Recommended)
Download from: https://code.visualstudio.com/

### 3. MongoDB (Choose One Option Below)

---

## 🗄️ MongoDB Setup

### 🌟 OPTION A: MongoDB Atlas (Recommended - Cloud & FREE)

**Step-by-step with screenshots:**

#### 1. Create Account
- Go to: https://www.mongodb.com/cloud/atlas
- Click **"Try Free"**
- Sign up with email or Google

#### 2. Create Cluster
- Click **"Build a Database"**
- Choose **"M0 FREE"** tier (Don't worry, it's actually free!)
- Cloud Provider: **AWS** (recommended)
- Region: Choose closest to you
- Cluster Name: Leave default or name it `airbnb-cluster`
- Click **"Create"**
- ⏰ Wait 3-5 minutes for cluster to deploy

#### 3. Create Database User
- Left sidebar → **"Database Access"**
- Click **"+ Add New Database User"**
- Authentication Method: **Password**
- Username: `airbnb_admin`
- Password: Click **"Autogenerate Secure Password"**
  - **⚠️ IMPORTANT: COPY THIS PASSWORD!** You'll need it!
  - Save it in a safe place (notepad, password manager)
- Database User Privileges: **"Atlas admin"**
- Click **"Add User"**

#### 4. Allow Network Access
- Left sidebar → **"Network Access"**
- Click **"+ Add IP Address"**
- Click **"Allow Access from Anywhere"**
  - This adds: `0.0.0.0/0`
  - ⚠️ For development only! In production, use specific IPs
- Click **"Confirm"**

#### 5. Get Connection String
- Left sidebar → **"Database"**
- Your cluster should show **"Active"**
- Click **"Connect"** button
- Choose **"Connect your application"**
- Driver: **Node.js**
- Version: **4.1 or later**
- Copy the connection string:

```
mongodb+srv://airbnb_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**⚠️ CRITICAL: Replace `<password>` with your actual password!**

Example:
```
If your password is: myP@ssw0rd123
Your connection string becomes:
mongodb+srv://airbnb_admin:myP@ssw0rd123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**💡 Tip:** If your password has special characters, URL-encode them:
- `@` becomes `%40`
- `!` becomes `%21`
- `#` becomes `%23`

---

### 🖥️ OPTION B: Local MongoDB (Alternative)

**macOS:**
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

**Ubuntu/Debian:**
```bash
# Install
sudo apt-get update
sudo apt-get install -y mongodb

# Start service
sudo systemctl start mongodb

# Enable auto-start
sudo systemctl enable mongodb

# Check status
sudo systemctl status mongodb
```

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer (choose "Complete")
3. Check "Install MongoDB as a Service"
4. Start MongoDB service from Services panel

**Your connection string will be:**
```
mongodb://localhost:27017/airbnb-clone
```

---

## 🔧 Backend Setup

### 1. Open Project in VS Code

```bash
# Navigate to your project folder
cd path/to/your/project

# Open in VS Code
code .
```

### 2. Open Terminal in VS Code

**Method 1:** Press `` Ctrl + ` `` (backtick key)
**Method 2:** Menu → Terminal → New Terminal
**Method 3:** Press `Ctrl+Shift+P` → Type "Terminal" → Select "Create New Terminal"

### 3. Navigate to Backend Folder

```bash
cd backend
```

### 4. Install Dependencies

```bash
npm install
```

**This installs:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon
- and more...

**Wait time:** 1-2 minutes

**Expected output:**
```
added 200 packages, and audited 201 packages in 45s
found 0 vulnerabilities
```

### 5. Create Environment File

```bash
# Copy example file
cp .env.example .env
```

**Or manually:**
1. In VS Code, navigate to `backend` folder
2. Create new file: `.env`
3. Copy contents from `.env.example`

### 6. Edit .env File

**In VS Code:**
1. Open `backend/.env`
2. Fill in these values:

```env
# Paste your MongoDB connection string here
MONGODB_URI=mongodb+srv://airbnb_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/airbnb-clone?retryWrites=true&w=majority

# Generate JWT secret (see command below)
JWT_SECRET=paste-generated-secret-here

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Generate JWT Secret:**

In your terminal, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Output example:**
```
a7f3d8e9c2b4f6a1e5d8c9b7a4f2e6d9c8b5a3f1e7d6c4b2a9f8e5d3c1b7a6f4
```

Copy this and paste it as your `JWT_SECRET` value.

### 7. Seed Database with Sample Data

```bash
npm run seed
```

**Expected output:**
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

📊 Summary:
   Users: 3
   Listings: 5
   Reviews: 2

🔑 Test Credentials:
   Email: john@example.com
   Password: password123

   Email: jane@example.com
   Password: password123
```

**If you see this, you're good to go! ✅**

### 8. Start Backend Server

```bash
npm run dev
```

**Expected output:**
```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
✅ MongoDB Connected
🚀 Server running on port 5000
📍 Environment: development
```

**🎉 Backend is running!**

**Leave this terminal running!** Don't close it.

---

## 🧪 Testing

### Test 1: Health Check

**In browser, visit:**
```
http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-27T...",
  "uptime": 12.345
}
```

### Test 2: Get Listings

**In browser, visit:**
```
http://localhost:5000/api/listings
```

**Expected response:**
```json
{
  "listings": [
    {
      "_id": "...",
      "title": "Cozy Downtown Loft with City Views",
      "description": "...",
      "location": {
        "city": "San Francisco",
        "state": "CA"
      },
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

### Test 3: Login

**Using curl (in new terminal):**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Expected response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### Test 4: Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create new request
3. Method: `GET`
4. URL: `http://localhost:5000/api/listings`
5. Click Send
6. See results!

---

## 🎨 Frontend Configuration

### 1. Open New Terminal

**Keep backend terminal running!**

In VS Code:
- Click `+` icon in terminal panel
- Or press `` Ctrl + Shift + ` ``

### 2. Go to Project Root

```bash
# Go back to root (if you're in backend)
cd ..

# Verify you're in root
pwd
# Should show: /path/to/your/project

# Or check for App.tsx
ls App.tsx
# Should show: App.tsx
```

### 3. Create Frontend .env

```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

**Or manually create:**
1. In VS Code, create file: `.env` (in root, not in backend!)
2. Add this line:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Frontend is Ready!

Since you're using Figma Make, the frontend should already be visible in the preview.

---

## 📋 Common Commands

### Backend Commands (in `/backend` folder)

```bash
# Start development server (auto-restart)
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Install dependencies
npm install

# Install new package
npm install package-name
```

### Useful Terminal Commands

```bash
# Check what's running on port 5000
lsof -i :5000

# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Check Node version
node --version

# Check npm version
npm --version

# View environment variables (macOS/Linux)
cat backend/.env

# View environment variables (Windows)
type backend\.env
```

### MongoDB Commands

```bash
# Check MongoDB is running (macOS)
brew services list | grep mongodb

# Start MongoDB (macOS)
brew services start mongodb-community

# Stop MongoDB (macOS)
brew services stop mongodb-community

# Check MongoDB status (Ubuntu)
sudo systemctl status mongodb

# Start MongoDB (Ubuntu)
sudo systemctl start mongodb
```

---

## 🎯 Quick Reference

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
# Keep running!
```

### Terminal 2: Commands
```bash
# Use for other commands
# git, npm install, etc.
```

### URLs to Remember

| URL | Purpose |
|-----|---------|
| http://localhost:5000 | Backend API info |
| http://localhost:5000/health | Health check |
| http://localhost:5000/api/listings | Get all listings |
| http://localhost:5000/api/auth/login | Login endpoint |

### Test Accounts

| Email | Password | Role |
|-------|----------|------|
| john@example.com | password123 | Host |
| jane@example.com | password123 | Host |
| mike@example.com | password123 | Guest |

---

## 🔄 Daily Workflow

**Starting work:**
```bash
# 1. Open VS Code
code .

# 2. Start backend
cd backend
npm run dev

# 3. Start coding!
```

**Stopping work:**
```bash
# In backend terminal
Ctrl + C  # Stops the server

# Close VS Code
Ctrl + Q
```

**Restarting after changes:**
```
# Nodemon auto-restarts, but if needed:
rs  # Type this in backend terminal and press Enter
```

---

## 🎓 VS Code Tips

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `` Ctrl + ` `` | Toggle terminal |
| `` Ctrl + Shift + ` `` | New terminal |
| `Ctrl + P` | Quick file open |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + B` | Toggle sidebar |
| `Ctrl + /` | Toggle comment |
| `Alt + Up/Down` | Move line up/down |

### Multi-Terminal Layout

1. Click terminal panel
2. Click split terminal icon (⊞)
3. Now you can see both terminals side-by-side!

---

## ✅ Success Checklist

Mark these off as you complete them:

- [ ] Node.js installed (`node --version` shows v16+)
- [ ] MongoDB Atlas account created OR local MongoDB running
- [ ] Project opened in VS Code
- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file created and configured
- [ ] JWT secret generated
- [ ] Database seeded (`npm run seed`)
- [ ] Backend running (`npm run dev`)
- [ ] Health check works (http://localhost:5000/health)
- [ ] Can see listings (http://localhost:5000/api/listings)
- [ ] Can login with test account
- [ ] Frontend `.env` created

---

## 🎉 You're Done!

Your Airbnb clone is now running locally!

**What you have:**
- ✅ Backend API running on port 5000
- ✅ MongoDB database with sample data
- ✅ 5 sample listings
- ✅ 3 test user accounts
- ✅ Full authentication system
- ✅ Booking system
- ✅ Review system

**Next steps:**
- Explore the API endpoints
- Try creating a booking
- Leave a review
- Create your own listing

**Need help?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Happy coding!** 🚀
