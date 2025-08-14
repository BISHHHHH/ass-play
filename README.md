# ASS Subtitle Video Player

A modern, responsive web-based video player with full Advanced SubStation Alpha (.ass) subtitle support. Built with React, TypeScript, and Tailwind CSS, featuring perfect subtitle synchronization, style preservation, and a beautiful user interface.

**🌐 Live Demo**: [https://ass-player.vercel.app/](https://ass-player.vercel.app/)

## ✨ Features

- **🎬 Full ASS Format Support**: Complete parsing of Advanced SubStation Alpha subtitle files
- **⏱️ Perfect Synchronization**: Subtitles stay perfectly timed during playback, seeking, and pause operations
- **🎨 Style Preservation**: Maintains original subtitle styling, positioning, and formatting
- **📱 Responsive Design**: Touch-friendly controls that work seamlessly on desktop and mobile
- **🎮 Advanced Controls**: Play/pause, seek, volume control, subtitle toggle, and fullscreen support
- **🌙 Modern UI**: Beautiful interface built with shadcn/ui components and Tailwind CSS
- **⚡ Performance**: Optimized subtitle rendering with smooth playback

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ass-play-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
ass-play-main/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── VideoPlayer.tsx # Main video player component
│   ├── pages/
│   │   ├── Index.tsx     # Main page
│   │   └── NotFound.tsx  # 404 page
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── App.tsx           # Main app component
├── public/               # Static assets
│   ├── sample-video.mp4  # Sample video file
│   └── subtitles.ass     # Sample ASS subtitle file
└── package.json
```

## 🎯 Usage

### Basic Implementation

```tsx
import VideoPlayer from '@/components/VideoPlayer';

function App() {
  return (
    <VideoPlayer 
      src="/path/to/video.mp4"
      subtitleSrc="/path/to/subtitles.ass"
      className="custom-styles"
    />
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | ✅ | Video file URL |
| `subtitleSrc` | `string` | ❌ | ASS subtitle file URL |
| `className` | `string` | ❌ | Additional CSS classes |

## 🎮 Player Controls

- **Play/Pause**: Click video or use play/pause button
- **Seek**: Drag the progress bar to jump to specific time
- **Volume**: Click volume icon or drag volume slider
- **Subtitles**: Toggle subtitle display with subtitle button
- **Fullscreen**: Enter/exit fullscreen mode
- **Auto-hide**: Controls automatically fade during playback

## 🔧 Technical Details

### ASS Parsing

The player includes a comprehensive ASS parser that handles:

- **Events Section**: Subtitle timing and text content
- **Styles Section**: Font, color, positioning, and effects
- **Script Info**: Metadata and global settings
- **V4+ Styles**: Advanced styling features

### Subtitle Rendering

- Real-time subtitle display with perfect timing
- Style inheritance and override support
- Positioning and margin handling
- Multi-layer subtitle support

### Performance Optimizations

- Efficient subtitle parsing and caching
- Smooth video playback with subtitle sync
- Responsive controls with touch support
- Optimized rendering for web browsers

## 🎨 Customization

### Styling

The player uses Tailwind CSS and shadcn/ui components, making it easy to customize:

```css
/* Custom video player styles */
.video-player {
  @apply rounded-lg shadow-2xl;
}

/* Custom subtitle styles */
.subtitle-text {
  @apply text-white font-bold;
}
```

### Component Override

You can extend or override the VideoPlayer component:

```tsx
import VideoPlayer from '@/components/VideoPlayer';

// Custom video player with additional features
function CustomVideoPlayer(props) {
  return (
    <div className="custom-wrapper">
      <VideoPlayer {...props} />
      {/* Additional custom elements */}
    </div>
  );
}
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3**: Static website hosting
- **Any static hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast build tooling

## 📞 Support

If you have any questions or need help:

- Open an [issue](../../issues) on GitHub
- Check the [documentation](docs/)
- Review the [examples](examples/)

---

**Made with ❤️ for the subtitle community**





