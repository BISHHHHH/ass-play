# Quick Deployment Commands

## For submission, you can use any of these deployment methods:

### 1. Using Vercel CLI (Fastest)
```bash
# Install Vercel CLI
npm i -g vercel

# In your project directory
vercel

# Follow prompts, then get instant deployment URL
```

### 2. Using Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### 3. Build for Static Hosting
```bash
# Build the project
npm run build

# The 'dist' folder contains all files needed
# Upload 'dist' folder contents to any web host
```

Your submission will be a complete, deployable React web application with:
- Your actual Instagram Reels video
- Your real .ass subtitle file with proper formatting
- Professional video player interface
- Mobile and desktop compatibility