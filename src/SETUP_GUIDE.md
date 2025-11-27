# 🚀 Quick Setup Guide for VS Code

Follow these simple steps to run the Eazypg project on your local machine.

## Step 1: Download the Project

1. Download the entire project folder
2. Extract it to your desired location

## Step 2: Open in VS Code

1. Open Visual Studio Code
2. Click `File` → `Open Folder`
3. Select the `eazypg-booking-platform` folder

## Step 3: Install Node.js (If not installed)

1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install the LTS (Long Term Support) version
3. Verify installation by opening terminal and typing:
   ```bash
   node --version
   npm --version
   ```

## Step 4: Install Dependencies

1. Open the integrated terminal in VS Code:
   - Press `` Ctrl + ` `` (backtick) or
   - Click `Terminal` → `New Terminal`

2. Run the installation command:
   ```bash
   npm install
   ```
   
   This will download all required packages (React, TypeScript, Tailwind, etc.)
   
   ⏱️ **This may take 2-5 minutes depending on your internet speed**

## Step 5: Start the Development Server

Once installation is complete, run:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Step 6: Open in Browser

1. Hold `Ctrl` (or `Cmd` on Mac) and click the link `http://localhost:5173/`
   OR
2. Open your browser manually and go to `http://localhost:5173/`

🎉 **You should now see the Eazypg website running!**

## 🎯 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## 🛠️ Useful VS Code Extensions

Install these extensions for a better development experience:

1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Tailwind CSS IntelliSense** - Tailwind autocomplete
3. **TypeScript Vue Plugin (Volar)** - Better TypeScript support
4. **Prettier - Code formatter** - Auto-format code
5. **ESLint** - Code linting

## 🐛 Troubleshooting

### Problem: `npm: command not found`
**Solution:** Node.js is not installed or not in PATH. Reinstall Node.js from nodejs.org

### Problem: Port 5173 already in use
**Solution:** Either close the application using that port, or Vite will automatically use the next available port (5174, 5175, etc.)

### Problem: Blank white screen
**Solution:** 
1. Check the browser console (F12) for errors
2. Try clearing browser cache
3. Restart the dev server (`Ctrl + C` then `npm run dev`)

### Problem: Module not found errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Problem: Cannot find module 'motion/react'
**Solution:** Make sure all dependencies are installed:
```bash
npm install
```

## 📁 File Structure Overview

```
eazypg-booking-platform/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── styles/            # CSS files
│   ├── App.tsx            # Main app
│   └── main.tsx           # Entry point
├── public/                # Static files
├── index.html             # HTML template
├── package.json           # Dependencies
└── vite.config.ts         # Vite config
```

## 💡 Tips

- **Hot Reload**: Changes you make are automatically reflected in the browser
- **Save Files**: Use `Ctrl + S` to save - changes will update instantly
- **Stop Server**: Press `Ctrl + C` in the terminal to stop the server
- **Multiple Terminals**: You can open multiple terminals for different tasks

## 🎨 Making Changes

1. Open any `.tsx` file in `src/components/`
2. Make your changes
3. Save the file (`Ctrl + S`)
4. See changes instantly in the browser!

## 🌐 Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## 📞 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Search for errors on Google or Stack Overflow
- Check the browser console (F12) for error messages

---

**Happy Coding! 🚀**

If you see the Eazypg website with animated logo and hero section, you're all set! 🎉
