# GGym Platform

A comprehensive fitness training platform built with React + TypeScript + Vite.

## Features

- 🏋️‍♂️ **Professional Training Plans**: 8 different workout programs for various fitness levels
- 🎥 **Video Backgrounds**: Engaging video backgrounds for immersive experience
- 📱 **Responsive Design**: Optimized for all devices and screen sizes
- ⚡ **Fast Performance**: Built with Vite for optimal loading speeds
- 🎨 **Modern UI**: Clean and professional design

## Tech Stack

- **Frontend**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router DOM 7.6.2
- **Styling**: CSS3
- **Linting**: ESLint

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:prod

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Project Structure

```
GGymPlatform/
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/          # Images and videos
│   │   ├── images/      # Image files
│   │   └── videos/      # Video files
│   ├── components/      # React components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── TrainingPlansPage.tsx
│   │   ├── TrainingPlanDetail.tsx
│   │   └── Navigation.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── vercel.json          # Vercel deployment configuration
└── DEPLOYMENT.md        # Deployment guide
```

## Pages

- **Home**: Landing page with video background
- **Training Plans**: Overview of all available workout programs
- **Training Plan Detail**: Detailed information for each training plan
- **About**: Information about the platform
- **Contact**: Contact information and form

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Build Settings**
   - Build Command: `npm run build:prod`
   - Output Directory: `dist`
   - Framework Preset: Vite

3. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=GGym Platform
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.ggymplatform.com
VITE_SHOP_URL=https://shop.ggymplatform.com
```

## Performance Optimizations

- ✅ Code splitting for optimal loading
- ✅ Image and video optimization
- ✅ Static asset caching
- ✅ SEO optimization
- ✅ Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please refer to the [Deployment Guide](DEPLOYMENT.md) or contact the development team.
