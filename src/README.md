# Eazypg - PG Accommodation Booking Platform

A modern, fully-featured PG (Paying Guest) accommodation booking platform built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion). Features beautiful animations, responsive design, and a complete booking flow.

## 🚀 Features

- **Animated Hero Section** - Eye-catching landing page with gradient animations
- **Property Listings** - Grid view with image carousels and wishlist functionality
- **Advanced Search** - Filter by location, dates, guests, and amenities
- **Interactive Map** - Split-layout search results with sticky map view
- **Detailed Property Pages** - Full property information with image galleries
- **Multi-step Checkout** - Secure booking flow with payment integration
- **User Authentication** - Sign in/Sign up modals
- **Host Dashboard** - Become a host and list properties
- **Contact & About Pages** - Complete informational pages
- **Smooth Animations** - 20+ animations powered by Motion
- **Fully Responsive** - Works on all devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Download or Clone the project**
   ```bash
   # If you have the folder, navigate to it
   cd eazypg-booking-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (Vite's default port)

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 🗂️ Project Structure

```
eazypg-booking-platform/
├── src/
│   ├── components/         # React components
│   │   ├── AirbnbHome.tsx
│   │   ├── AirbnbSearchResults.tsx
│   │   ├── ListingDetail.tsx
│   │   ├── Checkout.tsx
│   │   ├── Auth.tsx
│   │   ├── EazypgLogo.tsx
│   │   ├── EazypgHero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── AnimatedTitle.tsx
│   │   └── ... (more components)
│   ├── styles/
│   │   └── globals.css     # Global styles & Tailwind
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── README.md               # This file
```

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4.0** - Utility-first CSS
- **Motion (Framer Motion)** - Animation library
- **Lucide React** - Icon library
- **React Slick** - Carousel component
- **Recharts** - Chart library (for analytics)
- **React Hook Form** - Form handling
- **Sonner** - Toast notifications

## 🌈 Key Components

### EazypgLogo
Animated logo with gradient effects and hover animations.

### EazypgHero
Full hero section with animated backgrounds, stats, and CTAs.

### LoadingScreen
Beautiful loading animation on initial page load.

### AirbnbHome
Main homepage with property listings and category filters.

### AirbnbSearchResults
Split-layout search page with map view.

### ListingDetail
Detailed property page with image gallery and amenities.

### Checkout
Multi-step checkout flow with payment processing.

## 🎯 Usage

### Running in Development

```bash
npm run dev
```

This will start the Vite development server with hot module replacement (HMR).

### Building for Production

```bash
npm run build
```

This will:
1. Run TypeScript compiler
2. Bundle and optimize assets
3. Output to `dist/` folder

### Linting

```bash
npm run lint
```

## 🔧 Configuration

### Tailwind CSS
Tailwind is configured in `src/styles/globals.css` using Tailwind v4.0 CSS-based configuration.

### TypeScript
TypeScript is configured in `tsconfig.json` with strict mode enabled.

### Vite
Vite configuration is in `vite.config.ts` with React plugin and path aliases.

## 🌐 Environment Variables

If you need to add API endpoints or configuration:

1. Create a `.env` file in the root directory
2. Add your variables:
   ```
   VITE_API_URL=your_api_url_here
   VITE_SUPABASE_URL=your_supabase_url
   ```
3. Access them in your code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port.

### Module not found errors
Try removing `node_modules` and reinstalling:
```bash
rm -rf node_modules
npm install
```

### TypeScript errors
Make sure all dependencies are installed:
```bash
npm install
```

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Development

Built with ❤️ using modern web technologies. Perfect for learning React, TypeScript, and animation techniques.

## 🚀 Deployment

You can deploy this application to:
- **Vercel** - Recommended (automatic Vite support)
- **Netlify** - Easy deployment with drag & drop
- **GitHub Pages** - Free hosting
- **Your own server** - Use the `dist` folder after building

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Happy Coding! 🎉**
