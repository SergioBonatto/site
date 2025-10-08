'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

interface PlayerState {
  isReady: boolean;
  isPlaying: boolean;
  isInitialized: boolean;
  hasError: boolean;
  isMuted: boolean;
}

interface PlayerVars {
  autoplay: number;
  controls: number;
  showinfo: number;
  modestbranding: number;
  loop: number;
  rel: number;
  fs: number;
  disablekb: number;
  playsinline: number;
  enablejsapi: number;
  iv_load_policy: number;
  playlist: string;
  origin?: string;
}

const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';
const HACKING_STAGES = [
  "INITIALIZING BREACH PROTOCOL...",
  "ACCESSING MAINFRAME...",
  "BYPASSING SECURITY...",
  "DECRYPTING DATABASE...",
  "ACCESS GRANTED!"
] as const;

const baseVideoOptions = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    loop: 1,
    rel: 0,
    fs: 0,
    disablekb: 1,
    playsinline: 1,
    enablejsapi: 1,
    iv_load_policy: 3,
    playlist: YOUTUBE_VIDEO_ID,
    mute: 1,
  } as PlayerVars,
};

export default function VideoPage() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const unmutingRef = useRef(false);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isReady: false,
    isPlaying: false,
    isInitialized: false,
    hasError: false,
    isMuted: true
  });
  const [mounted, setMounted] = useState(false);
  const [hackingStage, setHackingStage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const updatePlayerState = useCallback((updates: Partial<PlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }));
  }, []);

  const unmuteVideo = useCallback(() => {
    if (!playerRef.current || unmutingRef.current) return;

    try {
      unmutingRef.current = true;
      const player = playerRef.current;

      player.setVolume(100);
      player.unMute();

      updatePlayerState({ isMuted: false });
      unmutingRef.current = false;
    } catch (error) {
      console.error('Error unmuting video:', error);
      unmutingRef.current = false;
    }
  }, [updatePlayerState]);

  const initializePlayer = useCallback(() => {
    if (!playerRef.current || playerState.isInitialized) return;

    try {
      const player = playerRef.current;
      updatePlayerState({ isInitialized: true });

      player.mute();
      player.playVideo();

      const interval = setInterval(() => {
        if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
          unmuteVideo();
          clearInterval(interval);
        }
      }, 50);

      setTimeout(() => clearInterval(interval), 2000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error in player initialization:', error);
      updatePlayerState({ hasError: true });
    }
  }, [playerState.isInitialized, unmuteVideo, updatePlayerState]);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setHackingStage(prev => {
        if (prev >= HACKING_STAGES.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowVideo(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showVideo && playerRef.current && !playerState.isInitialized) {
      initializePlayer();
    }
  }, [showVideo, playerState.isInitialized, initializePlayer]);

  const handleStateChange = useCallback((event: YouTubeEvent) => {
    const player = event.target;
    const currentState = player.getPlayerState();

    if (currentState === YouTube.PlayerState.PLAYING) {
      updatePlayerState({ isPlaying: true });

      if (player.isMuted()) {
        unmuteVideo();
      }
    } else if (currentState === YouTube.PlayerState.ENDED ||
              currentState === YouTube.PlayerState.PAUSED) {
      try {
        player.playVideo();
      } catch (err) {
        console.error('Error resuming video:', err);
      }
    }
  }, [updatePlayerState, unmuteVideo]);

  const handleVideoReady = useCallback((event: YouTubeEvent) => {
    const player = event.target;
    playerRef.current = player;
    updatePlayerState({ isReady: true });

    try {
      player.mute();
      player.playVideo();
    } catch (error) {
      console.error('Error in video ready handler:', error);
    }
  }, [updatePlayerState]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      {!playerState.hasError && showVideo ? (
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full scale-150">
            <div className="absolute inset-0 z-10" />
            <YouTube
              videoId={YOUTUBE_VIDEO_ID}
              opts={{
                ...baseVideoOptions,
                playerVars: {
                  ...baseVideoOptions.playerVars,
                  origin: typeof window !== 'undefined' ? window.location.origin : undefined,
                },
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
              onReady={handleVideoReady}
              onError={() => updatePlayerState({ hasError: true })}
              onStateChange={handleStateChange}
            />
          </div>
        </div>
      ) : (
        <HackingAnimation
          stage={hackingStage}
          stages={HACKING_STAGES}
        />
      )}
    </div>
  );
}

function HackingAnimation({
  stage,
  stages
}: {
  stage: number;
  stages: readonly string[];
}) {
  return (
    <main className="relative z-10 flex-1 flex items-center justify-center">
      <div className="backdrop-blur-sm bg-black/30 p-8 rounded-lg max-w-md w-full">
        <div className="space-y-6 font-mono">
          {stages.map((stageText, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                index <= stage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className={`text-sm ${
                index === stage ? 'text-green-400 animate-pulse' : 'text-green-600'
              }`}>
                {stageText}
                {index === stage && (
                  <span className="inline-block animate-[blink_1s_step-end_infinite]">_</span>
                )}
              </p>
              {index === stage && (
                <div className="h-1 w-full bg-gray-800 mt-2 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
