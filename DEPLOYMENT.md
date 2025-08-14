# ASS Subtitle Video Player - Deployment Guide

## 📁 Project Overview

This is a React web application that plays videos with Advanced SubStation Alpha (.ass) subtitle support. Built with React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub repository
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Deploy with one click - Vercel auto-detects Vite projects

### Option 2: Netlify
1. Push code to GitHub repository  
2. Connect to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option 3: GitHub Pages
1. In your GitHub repo settings, enable GitHub Pages
2. Set source to "GitHub Actions"
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🛠️ Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📋 Project Features

✅ **Advanced SubStation Alpha (.ass) Subtitle Support**
- Full ASS format parsing with style preservation
- Accurate timing and positioning
- Real-time subtitle synchronization

✅ **Modern Video Player**
- HTML5 video with custom controls
- Play/pause, seeking, volume control
- Fullscreen support
- Auto-hiding controls

✅ **Responsive Design**
- Works on desktop and mobile browsers
- Touch-friendly controls
- Netflix-inspired dark theme

✅ **Web Technologies**
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for fast development and building
- Shadcn/ui components

## 📂 File Structure

```
├── public/
│   ├── instagram-reels-video.mp4    # Your video file
│   └── subtitles.ass                # Your subtitle file
├── src/
│   ├── components/
│   │   ├── VideoPlayer.tsx          # Main video player component
│   │   └── ui/                      # Shadcn/ui components
│   ├── pages/
│   │   └── Index.tsx                # Main page
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   └── index.css                    # Styles and design system
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🎯 Key Implementation Details

### ASS Subtitle Parser
- Parses Advanced SubStation Alpha format
- Supports styles, timing, and positioning
- Handles time format: `H:MM:SS.CC`
- Cleans formatting tags for web display

### Video Synchronization
- Real-time subtitle updates based on video time
- Maintains sync during seeking operations
- Automatic subtitle hiding/showing

### Responsive Controls
- Auto-hide controls during playback
- Touch and mouse interaction support
- Keyboard shortcuts support

## 🔧 Customization

### Adding New Videos
1. Place video files in `public/` directory
2. Update the `src` prop in `VideoPlayer` component
3. Add corresponding subtitle files

### Styling
- All colors and styles defined in `src/index.css`
- Uses CSS custom properties (variables)
- Tailwind utilities for responsive design

## 📝 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Troubleshooting

### Video Not Loading
- Check file paths in `public/` directory
- Verify video format compatibility (MP4 recommended)
- Check browser console for errors

### Subtitles Not Showing
- Verify `.ass` file format and encoding
- Check subtitle toggle button
- Ensure file is accessible in `public/` directory

### Build Issues
- Run `npm install` to ensure all dependencies
- Check Node.js version (v16+ required)
- Clear `node_modules` and reinstall if needed

## 📄 License

This project is available for educational and personal use.