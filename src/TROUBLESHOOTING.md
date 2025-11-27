# 🔧 Troubleshooting Guide

Common issues and solutions when running your Airbnb clone locally.

---

## 🗄️ MongoDB Connection Issues

### Error: `MongooseServerSelectionError: Could not connect to any servers`

**Cause:** Can't reach MongoDB server

**Solutions:**

1. **If using MongoDB Atlas:**
   ```bash
   # Check your IP is whitelisted
   # Go to: Atlas Dashboard → Network Access
   # Add IP: 0.0.0.0/0 (allows all - for development only)
   ```

2. **Verify connection string:**
   ```bash
   # Open backend/.env
   # Make sure MONGODB_URI is formatted correctly:
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/airbnb-clone
   
   # Common issues:
   # - Password has special characters (use URL encoding)
   # - Missing database name at the end
   # - Wrong cluster URL
   ```

3. **If using local MongoDB:**
   ```bash
   # macOS - Check if MongoDB is running
   brew services list | grep mongodb
   
   # Start if stopped
   brew services start mongodb-community
   
   # Ubuntu/Debian
   sudo systemctl status mongodb
   sudo systemctl start mongodb
   
   # Windows - Check MongoDB service in Services panel
   ```

---

### Error: `MongoParseError: Invalid connection string`

**Solution:**

```env
# WRONG - Missing protocol
MONGODB_URI=cluster0.xxxxx.mongodb.net/airbnb-clone

# CORRECT - MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/airbnb-clone

# CORRECT - Local MongoDB
MONGODB_URI=mongodb://localhost:27017/airbnb-clone
```

---

### Error: `Authentication failed`

**Solution:**

1. **Check username and password:**
   ```bash
   # Go to Atlas Dashboard → Database Access
   # Verify username matches
   # Reset password if needed
   ```

2. **URL-encode special characters in password:**
   ```bash
   # If password is: p@ssw0rd!
   # It should be: p%40ssw0rd%21
   
   # Common encodings:
   # @ → %40
   # ! → %21
   # # → %23
   # $ → %24
   # % → %25
   ```

---

## 🚀 Backend Server Issues

### Error: `Error: listen EADDRINUSE: address already in use :::5000`

**Cause:** Port 5000 is already being used by another process

**Solutions:**

1. **Find and kill the process:**
   ```bash
   # macOS/Linux
   lsof -i :5000
   kill -9 PID_NUMBER
   
   # Or one-liner
   kill -9 $(lsof -t -i:5000)
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID PID_NUMBER /F
   ```

2. **Or change the port:**
   ```bash
   # Edit backend/.env
   PORT=5001
   
   # Restart server
   npm run dev
   
   # Update frontend .env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

---

### Error: `JWT_SECRET is not defined`

**Solution:**

```bash
# Generate a secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to backend/.env
JWT_SECRET=paste-generated-secret-here
```

---

### Error: `Cannot find module 'express'`

**Solution:**

```bash
cd backend
npm install
```

---

## 🔐 Authentication Issues

### Error: `Token is not valid`

**Causes & Solutions:**

1. **Token expired (7 days):**
   ```javascript
   // Login again to get new token
   ```

2. **Token format wrong:**
   ```javascript
   // WRONG
   headers: { 'Authorization': 'YOUR_TOKEN' }
   
   // CORRECT
   headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
   ```

3. **JWT_SECRET changed:**
   ```bash
   # If you changed JWT_SECRET, all old tokens are invalid
   # Users need to login again
   ```

---

### Error: `No token, authorization denied`

**Solution:**

Make sure you're including the token in requests:

```javascript
// Using fetch
fetch('http://localhost:5000/api/bookings', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

// Using API service
import api from './services/api';
// Token is automatically included if user is logged in
```

---

## 📦 npm Issues

### Error: `npm ERR! code ENOENT`

**Solution:**

```bash
# Make sure you're in the right directory
cd backend

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

### Error: `npm ERR! peer dependencies`

**Solution:**

```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Or force install
npm install --force
```

---

## 🌐 CORS Issues

### Error: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions:**

1. **Check backend is running:**
   ```bash
   # Terminal should show:
   🚀 Server running on port 5000
   ```

2. **Verify CORS is enabled in backend/server.js:**
   ```javascript
   // Should have this line
   app.use(cors());
   ```

3. **Check frontend is calling correct URL:**
   ```bash
   # In root .env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Try clearing browser cache:**
   ```
   Ctrl+Shift+Delete → Clear cache
   Hard refresh: Ctrl+Shift+R
   ```

---

## 📊 Database Issues

### Database is empty / No listings showing

**Solution:**

```bash
cd backend
npm run seed

# You should see:
# ✅ Created 3 users
# ✅ Created 5 listings
# ✅ Created 2 reviews
```

---

### Error: `E11000 duplicate key error`

**Cause:** Trying to create duplicate data (e.g., same email)

**Solutions:**

1. **Clear database and reseed:**
   ```bash
   cd backend
   npm run seed
   # This automatically clears old data first
   ```

2. **Use different email:**
   ```javascript
   // Change email in your test
   email: 'newuser@example.com'
   ```

---

### Can't see data in MongoDB Atlas

**Solution:**

```bash
# Go to Atlas Dashboard
# Click "Browse Collections"
# Select database: airbnb-clone
# Check collections: users, listings, bookings, reviews
```

---

## 🎨 Frontend Issues

### Frontend can't connect to backend

**Checklist:**

- [ ] Backend is running (`npm run dev` in backend folder)
- [ ] Backend shows "🚀 Server running on port 5000"
- [ ] Root `.env` has `REACT_APP_API_URL=http://localhost:5000/api`
- [ ] Browser console shows no CORS errors (F12)
- [ ] Try: http://localhost:5000/api/listings in browser

---

### Environment variables not loading

**Solution:**

```bash
# Make sure file is named exactly: .env (not .env.txt)
# In project root, not in backend

# After creating/editing .env:
# Restart the development server
```

---

## 🔍 Debugging Tips

### Check Backend Logs

```bash
# Terminal running backend will show:
# - All API requests
# - Errors with stack traces
# - MongoDB connection status

# Example:
2025-11-27T10:30:45.123Z - POST /api/auth/login
✅ MongoDB Connected
```

---

### Check Browser Console

```
F12 → Console tab

Common errors:
- Network errors (CORS, 404, 500)
- API response errors
- JavaScript errors
```

---

### Test API with curl

```bash
# Health check
curl http://localhost:5000/health

# Get listings
curl http://localhost:5000/api/listings

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# If you get valid JSON response, backend is working!
```

---

### Use MongoDB Compass

Download: https://www.mongodb.com/products/compass

1. Connect using your MongoDB URI
2. Browse collections visually
3. Run queries
4. Verify data exists

---

## 🔄 Fresh Start (Nuclear Option)

If nothing works, start fresh:

```bash
# 1. Stop all servers (Ctrl+C in terminals)

# 2. Clean backend
cd backend
rm -rf node_modules package-lock.json
rm .env
npm install
cp .env.example .env
# Edit .env with your values

# 3. Reseed database
npm run seed

# 4. Start backend
npm run dev

# 5. In new terminal, check root .env
cd ..
cat .env
# Should have: REACT_APP_API_URL=http://localhost:5000/api

# 6. Test
curl http://localhost:5000/api/listings
```

---

## 📞 Still Stuck?

### Gather Information

Before asking for help, collect:

1. **Error message:**
   ```
   Full error from terminal or console
   ```

2. **What you tried:**
   ```
   Steps you followed
   ```

3. **Environment:**
   ```
   - OS: macOS/Windows/Linux
   - Node version: node --version
   - MongoDB: Atlas or Local
   ```

4. **Screenshots:**
   - Terminal output
   - Browser console
   - Error messages

---

## ✅ Verification Checklist

Everything working? Check these:

- [ ] Backend terminal shows "✅ MongoDB Connected"
- [ ] Backend terminal shows "🚀 Server running on port 5000"
- [ ] http://localhost:5000/health returns JSON
- [ ] http://localhost:5000/api/listings returns array of listings
- [ ] Can login with `john@example.com` / `password123`
- [ ] No errors in browser console (F12)

---

## 🎓 Prevention Tips

**Always:**
- ✅ Keep backend running while developing
- ✅ Check terminal for errors
- ✅ Use environment variables (never hardcode secrets)
- ✅ Test API endpoints with curl/Postman first
- ✅ Check MongoDB Atlas dashboard for data

**Never:**
- ❌ Commit `.env` files to git
- ❌ Share your JWT_SECRET publicly
- ❌ Use `0.0.0.0/0` IP whitelist in production
- ❌ Hardcode API URLs in components

---

## 🎉 Happy Debugging!

Most issues are:
1. Environment variables not set (50%)
2. MongoDB connection string wrong (30%)
3. Port conflicts (10%)
4. Everything else (10%)

**You got this!** 💪
