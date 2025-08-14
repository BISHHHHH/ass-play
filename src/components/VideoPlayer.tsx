import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  Settings,
  Subtitles
} from 'lucide-react';

interface AssEvent {
  start: number;
  end: number;
  text: string;
  style: string;
  layer: number;
  marginL: number;
  marginR: number;
  marginV: number;
  effect: string;
}

interface AssStyle {
  name: string;
  fontName: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  outlineColor: string;
  backColor: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikeOut: boolean;
  scaleX: number;
  scaleY: number;
  spacing: number;
  angle: number;
  borderStyle: number;
  outline: number;
  shadow: number;
  alignment: number;
  marginL: number;
  marginR: number;
  marginV: number;
  encoding: number;
}

interface VideoPlayerProps {
  src: string;
  subtitleSrc?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  subtitleSrc, 
  className 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  
  const [assEvents, setAssEvents] = useState<AssEvent[]>([]);
  const [assStyles, setAssStyles] = useState<AssStyle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<AssEvent | null>(null);

  // Parse ASS subtitle file
  const parseAssFile = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      
      const lines = content.split('\n');
      const events: AssEvent[] = [];
      const styles: AssStyle[] = [];
      
      let inEventsSection = false;
      let inStylesSection = false;
      let eventFormat: string[] = [];
      let styleFormat: string[] = [];
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed === '[Events]') {
          inEventsSection = true;
          inStylesSection = false;
          continue;
        }
        
        if (trimmed === '[V4+ Styles]') {
          inStylesSection = true;
          inEventsSection = false;
          continue;
        }
        
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          inEventsSection = false;
          inStylesSection = false;
          continue;
        }
        
        if (inStylesSection && trimmed.startsWith('Format:')) {
          styleFormat = trimmed.substring(7).split(',').map(s => s.trim());
          continue;
        }
        
        if (inStylesSection && trimmed.startsWith('Style:')) {
          const styleData = trimmed.substring(6).split(',');
          if (styleData.length >= styleFormat.length) {
            const style: any = {};
            styleFormat.forEach((field, index) => {
              style[field] = styleData[index]?.trim();
            });
            
            styles.push({
              name: style.Name || 'Default',
              fontName: style.Fontname || 'Arial',
              fontSize: parseInt(style.Fontsize) || 20,
              primaryColor: style.PrimaryColour || '&Hffffff',
              secondaryColor: style.SecondaryColour || '&Hffffff',
              outlineColor: style.OutlineColour || '&H0',
              backColor: style.BackColour || '&H0',
              bold: style.Bold === '1',
              italic: style.Italic === '1',
              underline: style.Underline === '1',
              strikeOut: style.StrikeOut === '1',
              scaleX: parseFloat(style.ScaleX) || 100,
              scaleY: parseFloat(style.ScaleY) || 100,
              spacing: parseFloat(style.Spacing) || 0,
              angle: parseFloat(style.Angle) || 0,
              borderStyle: parseInt(style.BorderStyle) || 1,
              outline: parseFloat(style.Outline) || 2,
              shadow: parseFloat(style.Shadow) || 0,
              alignment: parseInt(style.Alignment) || 2,
              marginL: parseInt(style.MarginL) || 0,
              marginR: parseInt(style.MarginR) || 0,
              marginV: parseInt(style.MarginV) || 0,
              encoding: parseInt(style.Encoding) || 1
            });
          }
          continue;
        }
        
        if (inEventsSection && trimmed.startsWith('Format:')) {
          eventFormat = trimmed.substring(7).split(',').map(s => s.trim());
          continue;
        }
        
        if (inEventsSection && trimmed.startsWith('Dialogue:')) {
          const eventData = trimmed.substring(9).split(',');
          if (eventData.length >= eventFormat.length) {
            const event: any = {};
            eventFormat.forEach((field, index) => {
              if (field === 'Text') {
                // Join remaining parts for text (in case text contains commas)
                event[field] = eventData.slice(index).join(',');
              } else {
                event[field] = eventData[index]?.trim();
              }
            });
            
            const startTime = parseAssTime(event.Start);
            const endTime = parseAssTime(event.End);
            
            if (!isNaN(startTime) && !isNaN(endTime)) {
              events.push({
                start: startTime,
                end: endTime,
                text: cleanAssText(event.Text || ''),
                style: event.Style || 'Default',
                layer: parseInt(event.Layer) || 0,
                marginL: parseInt(event.MarginL) || 0,
                marginR: parseInt(event.MarginR) || 0,
                marginV: parseInt(event.MarginV) || 0,
                effect: event.Effect || ''
              });
            }
          }
        }
      }
      
      setAssEvents(events.sort((a, b) => a.start - b.start));
      setAssStyles(styles);
    } catch (error) {
      console.error('Error parsing ASS file:', error);
    }
  }, []);

  // Parse ASS time format (H:MM:SS.CC)
  const parseAssTime = (timeStr: string): number => {
    const parts = timeStr.split(':');
    if (parts.length !== 3) return NaN;
    
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const secondsParts = parts[2].split('.');
    const seconds = parseInt(secondsParts[0]);
    const centiseconds = parseInt(secondsParts[1] || '0');
    
    return hours * 3600 + minutes * 60 + seconds + centiseconds / 100;
  };

  // Clean ASS text (remove formatting tags for basic rendering)
  const cleanAssText = (text: string): string => {
    return text
      .replace(/\\N/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\{[^}]*\}/g, '')
      .trim();
  };

  // Load subtitles
  useEffect(() => {
    if (subtitleSrc) {
      parseAssFile(subtitleSrc);
    }
  }, [subtitleSrc, parseAssFile]);

  // Update current subtitle based on video time
  useEffect(() => {
    if (!showSubtitles) {
      setCurrentSubtitle(null);
      return;
    }

    const currentEvent = assEvents.find(
      event => currentTime >= event.start && currentTime <= event.end
    );
    
    setCurrentSubtitle(currentEvent || null);
  }, [currentTime, assEvents, showSubtitles]);

  // Video event handlers
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const handleMouseMove = () => resetTimeout();
    const handleMouseLeave = () => {
      clearTimeout(timeout);
      if (isPlaying) {
        setShowControls(false);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearTimeout(timeout);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isPlaying]);

  // Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "video-player w-full aspect-video group",
        className
      )}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={handlePlayPause}
      />

      {/* Subtitle Overlay */}
      {currentSubtitle && (
        <div className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
          <div className="subtitle-container px-4 py-2 rounded-lg max-w-4xl mx-4">
            <p className="subtitle-text text-center leading-relaxed">
              {currentSubtitle.text.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < currentSubtitle.text.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div 
        className={cn(
          "absolute inset-0 video-controls transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 video-overlay" />
        
        {/* Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="video-progress-slider"
            />
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="video"
                size="video"
                onClick={handlePlayPause}
                className="text-white hover:text-accent"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="video"
                  size="video"
                  onClick={toggleMute}
                  className="text-white hover:text-accent"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>
              </div>
              
              <span className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="video"
                size="video"
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={cn(
                  "text-white hover:text-accent",
                  showSubtitles && "text-accent"
                )}
              >
                <Subtitles className="w-4 h-4" />
              </Button>
              
              <Button
                variant="video"
                size="video"
                onClick={toggleFullscreen}
                className="text-white hover:text-accent"
              >
                {isFullscreen ? 
                  <Minimize className="w-4 h-4" /> : 
                  <Maximize className="w-4 h-4" />
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;