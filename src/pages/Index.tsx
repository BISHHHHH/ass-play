import VideoPlayer from '@/components/VideoPlayer';
import { createSampleSubtitleFile } from '@/lib/subtitle-sample';
import { useState, useEffect } from 'react';

const Index = () => {
  const [subtitleUrl, setSubtitleUrl] = useState<string>('');

  useEffect(() => {
    // Create sample subtitle file
    const url = createSampleSubtitleFile();
    setSubtitleUrl(url);

    // Cleanup on unmount
    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ASS Subtitle Video Player
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced SubStation Alpha (.ass) subtitle support with perfect timing, 
              styling preservation, and seamless playback on web browsers.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Video Player */}
          <div className="mb-8">
            <VideoPlayer 
              src="/sample-video.mp4"
              subtitleSrc={subtitleUrl}
              className="shadow-2xl"
            />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">.ass</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                ASS Format Support
              </h3>
              <p className="text-muted-foreground">
                Full Advanced SubStation Alpha format parsing with style preservation, 
                positioning, and timing accuracy.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">⏱️</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Perfect Sync
              </h3>
              <p className="text-muted-foreground">
                Subtitles stay perfectly synchronized during play, pause, 
                and seeking operations.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Responsive Design
              </h3>
              <p className="text-muted-foreground">
                Works seamlessly on desktop and mobile web browsers 
                with touch-friendly controls.
              </p>
            </div>
          </div>

          {/* Controls Info */}
          <div className="bg-card/50 p-6 rounded-xl border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Player Controls
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Play/Pause:</strong> Click video or use button
              </div>
              <div>
                <strong className="text-foreground">Seek:</strong> Drag progress bar
              </div>
              <div>
                <strong className="text-foreground">Volume:</strong> Click volume icon or drag slider
              </div>
              <div>
                <strong className="text-foreground">Subtitles:</strong> Toggle with subtitle button
              </div>
              <div>
                <strong className="text-foreground">Fullscreen:</strong> Click fullscreen button
              </div>
              <div>
                <strong className="text-foreground">Auto-hide:</strong> Controls fade during playback
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
