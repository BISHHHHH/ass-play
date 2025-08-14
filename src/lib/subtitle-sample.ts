// Sample ASS subtitle content for demonstration
export const sampleAssSubtitles = `[Script Info]
Title: Sample Video Subtitles
ScriptType: v4.00+

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&Hffffff,&Hffffff,&H0,&H80000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,Welcome to the ASS subtitle demo!
Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,This video player supports Advanced SubStation Alpha format.
Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,With proper timing and synchronization.
Dialogue: 0,0:00:09.50,0:00:11.00,Default,,0,0,0,,Enjoy the demonstration!
`;

// Convert sample to blob URL for testing
export const createSampleSubtitleFile = (): string => {
  const blob = new Blob([sampleAssSubtitles], { type: 'text/plain' });
  return URL.createObjectURL(blob);
};